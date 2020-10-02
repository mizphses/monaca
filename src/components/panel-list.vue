<template>
	<div>
		<button
			v-for="item in list"
			:key="item.name"
			class="button is-list-item flex w-full px-1 py-2"
			:disabled="!canBeAdded(item)"
			@click="addPanel(item)"
		>
			<div class="w-16 text-5xl mr-2">
				<FontAwesomeIcon
					:icon="item.icon"
					v-bind="item.iconSettings"
					fixed-width
				/>
			</div>
			<div class="text-left">
				<h3 class="text-xl mb-2">
					{{ item.name }}
				</h3>
				<p>{{ item.description }}</p>
			</div>
		</button>
	</div>
</template>

<script>
const PANELS_INFO = [
	{
		name: '水平切り替えメニュー',
		description: '右に右にパネルが切り替わります',
		icon: 'columns',
		iconSettings: {},
		type: 'Grid',
		maxDepth: 2,
		defaults() {
			return {
				direction: 'row'
			}
		}
	},
	{
		name: '垂直メニュー',
		description: '縦にメニューが積まれていきます',
		icon: 'columns',
		iconSettings: {
			rotation: 270
		},
		type: 'Grid',
		maxDepth: 2,
		defaults() {
			return {
				direction: 'column'
			}
		}
	},
	{
		name: 'シーン切り替え',
		description: '今のシーンを切り替えます',
		icon: 'tv',
		iconSettings: {},
		type: 'Scenes'
	},
	{
		name: '入力ソース一覧',
		description: '入力ソースのオン・オフを切り替えます',
		icon: 'video',
		iconSettings: {},
		type: 'Sources'
	},
	{
		name: '音響デバイス',
		description: '接続しているマイクなどの音響デバイスを切り替えます',
		icon: 'volume-up',
		iconSettings: {},
		type: 'Mixer'
	},
	{
		name: '画面切り替え効果の選択',
		description: '画面切り替え効果（トランジション）を選択します',
		icon: 'chart-bar',
		iconSettings: {},
		type: 'Transitions'
	},
	{
		name: '画面切り替え効果にかかる時間',
		description: '画面切り替え効果にかかる時間を設定します',
		icon: 'clock',
		iconSettings: {},
		type: 'Durations'
	},
	{
		name: '配信・録画状況',
		description: '配信・録画の状況を確かめます',
		icon: 'dot-circle',
		iconSettings: {},
		type: 'Stream'
	},
	{
		name: 'iframe埋め込み',
		description: 'このページにiframeタグを埋め込めます．',
		icon: 'window-maximize',
		iconSettings: {},
		type: 'Iframe'
	}
]

export default {
	props: {
		parentId: {
			type: [Number, String],
			required: true
		},
		parentDepth: {
			type: Number,
			required: true
		}
	},
	computed: {
		list() {
			return PANELS_INFO
		}
	},
	methods: {
		addPanel(item) {
			if (!this.canBeAdded(item)) {
				return
			}

			this.$store.dispatch('layout/addPanel', {
				type: item.type,
				parent: this.parentId,
				settings: item.defaults ? item.defaults() : {}
			})
			this.$emit('close')
		},
		canBeAdded(item) {
			if (item.maxDepth) {
				return this.parentDepth < item.maxDepth
			}

			return true
		}
	}
}
</script>
