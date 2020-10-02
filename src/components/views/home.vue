<template>
	<div class="flex overflow-y-auto flex-col">
		<div class="flex flex-col md:flex-row max-w-5xl self-center">
			<div class="connect-panel md:w-1/3 px-4 py-2">
				<connect @update:query="val => urlArgs = val" />

				<div class="card">
					<div class="card-title">
						<h2>自動ログイン</h2>
					</div>
					<div class="card-content">
						<p class="mb-2 text-sm">
							URLに#!autoがあれば自動ログインしてもらえます．
						</p>
						<label class="label">次のリンクをお気に入りに入れましょう！:</label>
						<a
							:href="exampleURL"
							class="block break-all mb-2"
							@click.prevent="() => {}"
						>{{ exampleURL }}</a>
						<p class="text-sm">
							パスワードをURLに加えるにはURLの最後に &password={password} を足します．全てのフィールドは &amp; と = を含んではいけません．
						</p>
					</div>
				</div>
			</div>
			<div class="md:w-2/3 px-4 py-2">
				<h1 class="text-3xl mb-2">
					Monaca OBSリモコン
				</h1>

				<p class="mb-2">
					<a
						href="https://obsproject.com/"
						target="_blank"
					>OBS</a>
					をWEBブラウザから操作します．
				</p>

				<div
					v-if="showHTTPSWarning"
					class="alert warning"
				>
					<h2>HTTPSで接続されています！</h2>

					<p>このプログラムの仕様でHTTPSを使用できません．何か言われるかもしれませんが <a :href="httpURL">こっちのページに進んでください</a></p>
				</div>

				<p class="mb-2">
					OBSリモコンを使うには
					<a
						href="https://obsproject.com/forum/resources/websocket-plugin.466/"
						target="_blank"
					>Websocket Plugin for OBS Studio</a>をインストールしなければなりません．このソフトは <strong>4.6.0</strong> 以降のバージョンに対応しています．
				</p>

				<h2 class="text-2xl mb-2">
					バグや機能追加の要望
				</h2>

				<p class="mb-2">
					元ソフトの方へお願いします→ <a
						href="https://github.com/t2t2/obs-tablet-remote/issues"
						target="_blank"
					>GitHub Issues</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Connect from './connect'

export default {
	components: {
		Connect
	},
	data() {
		return {
			urlArgs: ''
		}
	},
	computed: {
		exampleURL() {
			return `${location.origin + location.pathname}#!auto${this.urlArgs}`
		},
		httpURL() {
			return location.href.replace('https://', 'http://')
		},
		showHTTPSWarning() {
			return location.protocol === 'https:'
		}
	}
}
</script>

<style lang="postcss">
@screen md {
	.connect-panel {
		order: 2;
	}
}
</style>
