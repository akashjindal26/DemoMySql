const ORDER = function (order) {

    this.ORDER_DATE = order.ORDER_DATE;
    this.PRODUCT_ID = order.PRODUCT_ID;
    this.PRODUCT_QUANTITY = order.PRODUCT_QUANTITY;
    this.PRODUCT_DISCOUNT_PERCENT = order.PRODUCT_DISCOUNT_PERCENT;
    this.PRODUCT_PRICE = order.PRODUCT_PRICE;
    this.USER_ID = order.USER_ID;
    this.CREATED_ON = order.CREATED_ON;
    this.CREATED_BY = order.CREATED_BY;
    this.MODIFIED_ON = order.MODIFIED_ON;
    this.MODIFIED_BY = order.MODIFIED_BY;
};

module.exports = ORDER;