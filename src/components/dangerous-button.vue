<template>
	<button
		class="button"
		@click="buttonClick"
	>
		<span v-if="isPrimed">
			もう一度押して再確認します
			<strong v-if="cooldown">(1秒待つ)</strong>
		</span>
		<slot v-else />
	</button>
</template>

<script>
export default {
	props: {
		vibrate: Boolean
	},
	data() {
		return {
			cooldown: false,
			isPrimed: false
		}
	},
	methods: {
		buttonClick() {
			if (this.cooldown) {
				return
			}

			if (this.isPrimed) {
				this.isPrimed = false
				this.$emit('click')
				clearTimeout(this._timeout)
				return
			}

			this.isPrimed = true
			this.cooldown = true
			this._timeout = setTimeout(() => {
				this.cooldown = false
				this._timeout = setTimeout(() => {
					this.isPrimed = false
					this._timeout = null
				}, 5000)
			}, 1000)

			if (this.vibrate && window.navigator.vibrate) {
				window.navigator.vibrate(200)
			}
		}
	}
}
</script>
