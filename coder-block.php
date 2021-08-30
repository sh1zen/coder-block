<?php
/**
 * Plugin Name:       Coder Block
 * Plugin URI:        https://github.com/sh1zen/coder-block
 * Description:       A simple way to share and valuate code with Gutenberg.
 * Version:           1.0.0
 * Author:            sh1zen
 * Author URI:        https://sh1zen.github.io/
 * Text Domain:       coder-block
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

class CoderBlock
{
    public function run()
    {
        $this->actions();
    }

    private function actions()
    {
        add_action('block_categories_all', [$this, 'register_block_category'], 10, 1);

        add_action("plugins_loaded", [$this, 'set_locale']);

        add_action('init', [$this, "register_block"]);
    }

    /**
     * Renders the `coder-block` block on server.
     *
     * @param array $attributes Block attributes.
     * @param string $block_content Block default content.
     * @param WP_Block $block Block instance.
     *
     * @return string Returns the post content with php code evaluated added.
     *
     */
    public function render($attributes, $block_content, $block)
    {
        $attributes = array_merge([
            'evaluate'      => false,
            'showSource'    => false,
            'do_shortcodes' => false,
            'useACE'        => false,
            'mode'          => 'php',
            'code'          => ''
        ], $attributes);

        $evaluated = '';

        if ($attributes["evaluate"]) {
            // extract content from div pre
            $parsed_content = html_entity_decode(strip_tags($block_content));

            $parsed_content = trim($parsed_content);

            $evaluated = "<div>" . $this->interpret($parsed_content, $attributes['mode']) . "</div>";
        }

        if ($attributes['do_shortcodes']) {
            $evaluated = do_shortcode(empty($evaluated) ? $block_content : $evaluated);
        }

        if ($attributes["showSource"]) {

            if ($attributes["useACE"]) {
                wp_enqueue_script('coder-block-frontend');
            }

            $evaluated = $block_content . $evaluated;
        }

        $result = trim($evaluated);

        if (empty($result)) {
            return '';
        }

        return $result;
    }

    private function interpret($code, $type)
    {
        if (empty($code))
            return '';

        if ($type === 'php') {

            if (preg_match("#<\?php(.*)\?>#s", $code, $matches)) {
                ob_start();

                extract(array('flex'));

                try {

                    eval('?>' . $code . '<?php');

                } catch (Exception $e) {
                    if (is_user_logged_in()) {
                        echo $e->getMessage();
                    }
                    else {
                        echo "An error occurred";
                    }
                }

                $code = ob_get_clean();
            }

        }
        elseif ($type === 'javascript') {
            $code = sprintf("<script type='application/javascript'>%s</script>", $code);
        }
        elseif ($type === 'css') {
            $code = sprintf("<style>%s</style>", $code);
        }

        return $code;
    }

    public function set_locale()
    {
        load_textdomain("coder-block", __DIR__ . '/languages/' . "coder-block.mo");
    }

    public function register_block_category($categories)
    {
        return array_merge(
            $categories,
            [
                [
                    'slug'  => 'scripts-blocks',
                    'title' => 'Scripts Blocks',
                    'icon'  => null,
                ],
            ]
        );
    }

    public function register_block()
    {
        register_block_type_from_metadata(
            __DIR__ . '/block.json',
            array(
                'render_callback' => [$this, 'render'],
            )
        );

        if (is_admin()) {
            $asset = include(__DIR__ . '/build/index.asset.php');

            wp_register_script(
                'coder-block-editor-script',
                plugin_dir_url(__FILE__) . '/build/index.js',
                $asset['dependencies'],
                $asset['version']
            );

            wp_register_style(
                'coder-block-editor-style',
                plugin_dir_url(__FILE__) . '/build/index.css',
                [],
                $asset['version']
            );
        }
        else {
            wp_register_script(
                'coder-block-frontend-ace',
                plugin_dir_url(__FILE__) . 'assets/ace-editor/ace.js'
            );

            wp_register_script(
                'coder-block-frontend',
                plugin_dir_url(__FILE__) . 'assets/js/frontend.min.js',
                ['jquery', 'coder-block-frontend-ace']
            );
        }
    }
}

$coderBlock = new CoderBlock();

$coderBlock->run();

