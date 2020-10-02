<template>
	<overlay
		wide
		@close="showSettings(false)"
	>
		<template #title>
			総合設定
		</template>

		<div class="flex -mx-2">
			<div class="w-1/2 px-2">
				<div class="field">
					<label
						:for="`settings-theme`"
						class="label"
					>テーマ</label>
					<select
						:id="`settings-theme`"
						v-model="theme"
						class="select"
					>
						<option value="default">
							標準
						</option>
						<option value="dark-blue">
							ダーク・ブルー
						</option>
						<option value="pure">
							ピュア
						</option>
					</select>
				</div>
			</div>
			<div class="w-1/2 px-2">
				<h3 class="text-xl mb-2">
					一考すべきゾーン
				</h3>
				<button
					class="button is-primary"
					@click="askForReset"
				>
					レイアウトを元に戻す
				</button>
			</div>
		</div>
	</overlay>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

import Overlay from '@/components/overlay'

export default {
	components: {
		Overlay
	},
	computed: {
		...mapState(['settings']),
		theme: {
			get({settings}) {
				return settings.theme
			},
			set(value) {
				this.setSetting({key: 'theme', value})
			}
		}
	},
	methods: {
		askForReset() {
			// eslint-disable-next-line no-alert
			if (confirm('Are you sure you want to reset the layout?')) {
				this.resetLayout()
			}
		},
		...mapMutations(['showSettings']),
		...mapMutations('settings', {
			setSetting: 'set'
		}),
		...mapMutations('layout', ['resetLayout'])
	}
}
</script>
