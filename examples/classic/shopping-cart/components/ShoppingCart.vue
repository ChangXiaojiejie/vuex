<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ currency(product.price) }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ currency(total) }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { currency } from '../currency'  // 格式化数字

export default {
  // 计算属性的方法，从store中的getters中获取
  computed: {
    // 当前购物车的状态
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    // 当前购物车中的商品以及总价
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    currency,
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
</script>
