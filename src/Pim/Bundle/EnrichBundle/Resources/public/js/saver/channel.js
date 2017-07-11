
/**
 * Module to save channel
 *
 * @author    Alexandr Jeliuc <alex@jeliuc.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
import _ from 'underscore'
import BaseSaver from 'pim/saver/base'
import Routing from 'routing'
import mediator from 'oro/mediator'
import $ from 'jquery'
export default _.extend({}, BaseSaver, {
            /**
             * {@inheritdoc}
             */
  getUrl: function (code) {
    if (code === null) {
      return Routing.generate(__moduleConfig.postUrl)
    }

    return Routing.generate(__moduleConfig.putUrl, {code: code})
  },

            /**
             * {@inheritdoc}
             */
  save: function (code, data, method) {
    var queryData = data
    var locales = []

    _.each(data.locales, function (locale) {
      locales.push(locale.code)
    })

    queryData.locales = locales

    return $.ajax({
      type: method,
      url: this.getUrl(code),
      data: JSON.stringify(queryData)
    }).then(function (entity) {
      mediator.trigger('pim_enrich:form:entity:post_save', entity)

      return entity
    })
  }
})
