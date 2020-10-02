<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			画面切り替え
		</template>

		<template
			v-if="allTransitions"
			class="transitions"
		>
			<button
				v-for="transition in allTransitions"
				:key="transition.name"
				class="button"
				:class="[transition.name === currentTransition ? 'is-active' : 'is-inactive']"
				@click="switchTransitions(transition.name)"
				v-text="transition.name"
			/>
		</template>
		<template v-else>
			トランジションが存在しません．フェードとかそんな感じなのを設定しておいてください．
		</template>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import panelMixin from '@/mixins/panel'

export default {

	mixins: [panelMixin],

	computed: {
		...mapState('obs', {
			currentTransition: state => state.transitions.current,
			allTransitions: state => state.transitions.list
		})
	},

	methods: {
		async switchTransitions(name) {
			await this.setTransition({name})
		},
		...mapActions('obs', {
			setTransition: 'transitions/current'
		})
	}
}

</script>
