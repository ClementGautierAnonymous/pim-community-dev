
/**
 * Price collection field
 *
 * @author    Julien Sanchez <julien@akeneo.com>
 * @author    Filips Alpe <filips@akeneo.com>
 * @copyright 2015 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
import $ from 'jquery'
import Field from 'pim/field'
import _ from 'underscore'
import FetcherRegistry from 'pim/fetcher-registry'
import fieldTemplate from 'pim/template/product/field/price-collection'
export default Field.extend({
  fieldTemplate: _.template(fieldTemplate),
  events: {
    'change .field-input:first input[type="text"]': 'updateModel'
  },
  renderInput: function (context) {
    context.value.data = _.sortBy(context.value.data, 'currency')

    return this.fieldTemplate(context)
  },
  updateModel: function () {
    var prices = []
    var inputs = this.$('.field-input:first .price-input input')
    _.each(inputs, function (input) {
      var $input = $(input)
      var inputData = $input.val()
      prices.push({
        amount: inputData === '' ? null : inputData,
        currency: $input.data('currency')
      })
    })

    this.setCurrentValue(_.sortBy(prices, 'currency'))
  },
  getTemplateContext: function () {
    return $.when(
                Field.prototype.getTemplateContext.apply(this, arguments),
                FetcherRegistry.getFetcher('currency').fetchAll()
            ).then(function (templateContext, currencies) {
              templateContext.currencies = currencies

              return templateContext
            })
  },
  setFocus: function () {
    this.$('input[type="text"]:first').focus()
  }
})
