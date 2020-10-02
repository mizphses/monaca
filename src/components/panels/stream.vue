<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			配信・録画状況
		</template>
		<DangerousButton
			:class="[streaming ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setStreaming({status: !streaming})"
		>
			配信: {{ streamingText }}
		</DangerousButton>
		<DangerousButton
			:class="[recording ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setRecording({status: !recording})"
		>
			録画: {{ recordingText }}
		</DangerousButton>
	</panel-wrapper>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

import DangerousButton from '../dangerous-button'
import panelMixin from '@/mixins/panel'

export default {
	components: {
		DangerousButton
	},
	mixins: [panelMixin],
	computed: {
		...mapState('obs', {
			recording: state => state.stream.recording,
			recTimecode: state => state.stream.recTimecode,
			streaming: state => state.stream.streaming,
			streamTimecode: state => state.stream.streamTimecode
		}),
		...mapGetters('obs', ['recordingText', 'streamingText'])
	},
	methods: {
		...mapActions('obs', {
			setRecording: 'stream/recording',
			setStreaming: 'stream/streaming'
		})
	}
}
</script>
