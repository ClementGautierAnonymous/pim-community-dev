<?php

namespace Pim\Bundle\CatalogBundle\tests\integration\PQB\Filter;

use Pim\Bundle\CatalogBundle\tests\integration\PQB\AbstractProductAndProductModelQueryBuilderTestCase;
use Pim\Component\Catalog\Query\Filter\Operators;

/**
 * @author    Adrien Pétremann <adrien.petremann@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
class ParentFilterIntegration extends AbstractProductAndProductModelQueryBuilderTestCase
{
    public function testOperatorIn()
    {
        $bikerJacket = $this->get('pim_catalog.repository.product_model')->findOneByIdentifier('model-biker-jacket');
        $this->createVariantProduct('product-biker-jacket', 'clothing', 'clothing_material_size', $bikerJacket, []);

        $result = $this->executeFilter([['parent', Operators::IN_LIST, ['model-biker-jacket']]]);
        $this->assert($result, [
            'model-biker-jacket-leather',
            'model-biker-jacket-polyester',
            'product-biker-jacket'
        ]);

        $result = $this->executeFilter([['parent', Operators::IN_LIST, ['model-biker-jacket', 'model-running-shoes']]]);
        $this->assert($result, [
            'model-biker-jacket-leather',
            'model-biker-jacket-polyester',
            'model-running-shoes-xxs',
            'model-running-shoes-m',
            'model-running-shoes-xxxl',
            'product-biker-jacket'
        ]);

        $result = $this->executeFilter([['parent', Operators::IN_LIST, ['dionysos']]]);
        $this->assert($result, []);
    }
}
