
/**
 * Delete extension for group type
 *
 * @author    Tamara Robichet <tamara.robichet@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
import DeleteForm from 'pim/form/common/delete'
import GroupTypeRemover from 'pim/remover/group-type'
export default DeleteForm.extend({
  remover: GroupTypeRemover
})
