/**
 * Displays the categories selector in grid column
 *
 * @author    Pierre Allard <pierre.allard@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
define(
    [
        'underscore',
        'pim/form',
        'pim/template/product/grid/column-category'
    ],
    function(
        _,
        BaseForm,
        template
    ) {
        return BaseForm.extend({
            template: _.template(template),
            className: 'AknDropdown AknColumn-block category-switcher',
            events: {
                'click': 'toggleThirdColumn'
            },

            /**
             * {@inheritdoc}
             */
            render() {
                this.$el.html(this.template);

                this.renderExtensions();
            },

            /**
             * Toggle the thrid column
             */
            toggleThirdColumn() {
                this.getRoot().trigger('grid:third_column:toggle');
            }
        });
    }
);
