<template>
	<panel-wrapper :content-class="['panel-invalid', 'is-scrollable']">
		<template slot="name">
			不明のパネル
		</template>
		<div class="panel-invalid-content">
			<p>パネルが見つかりません</p>
			<p>"{{ panel.type }}"は見つかりませんでした．このパネルを外してください．</p>
		</div>
	</panel-wrapper>
</template>

<script>
import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin]
}
</script>
