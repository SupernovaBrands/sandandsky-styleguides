const productFilter = $('.product-filter');
if (productFilter.length > 0) {
  import(/* webpackChunkName: 'product-category' */ '~mod/product-filter.js');
}


