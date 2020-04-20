<template>
  <div>
    <a-spin :spinning="this.$store.state.loading" tip="加载中...">
      <a-layout>
        <a-layout-header>一句</a-layout-header>
        <a-layout-content>
          <a-row type="flex" justify="center">
            <a-col
              :md="{ span: 12 }"
              :sm="{ span: 20 }"
              :xs="{ span: 22 }"
              style="margin-top: 20px"
            >
              <a-form-model
                ref="form"
                :model="form"
                :rules="rules"
                :label-col="{
                  span: 4
                }"
                :wrapper-col="{ span: 20 }"
              >
                <a-form-model-item label="内容" prop="word">
                  <a-textarea
                    v-model="form.word"
                    whitespace
                    :auto-size="{ minRows: 3 }"
                    placeholder="记录有意思的话~"
                    def
                  ></a-textarea>
                </a-form-model-item>
                <a-form-model-item label="出处" prop="from">
                  <a-input v-model="form.from" placeholder="来源~"></a-input>
                </a-form-model-item>
                <a-form-model-item label="地址" prop="source">
                  <a-input v-model="form.source" placeholder="地址~"></a-input>
                </a-form-model-item>
                <div style="display: flex;justify-content: center;">
                  <a-button type="primary" @click="onSubmit">
                    提交~
                  </a-button>
                </div>
              </a-form-model>
            </a-col>
          </a-row>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { message } from 'ant-design-vue'

@Component({})
export default class IndexPage extends Vue {
  // 原data
  form = {
    word: '',
    from: '',
    source: ''
  }

  // vuex state
  @Mutation('showloading') showloading!: boolean

  rules = {
    word: [
      {
        required: true,
        message: '请输入内容',
        whitespace: true,
        trigger: 'blur'
      }
    ],
    from: [
      {
        required: true,
        message: '请输入来源',
        whitespace: true,
        trigger: 'blur'
      }
    ]
  }

  $api: any

  get formRef(): Vue & { validate: () => boolean } {
    return this.$refs.form as Vue & { validate: () => boolean }
  }

  public async onSubmit() {
    const self = this
    const verify: boolean = await this.formRef.validate()
    if (verify) {
      try {
        const { code, msg, data } = await self.$api.index({
          ...this.form
        })
        if (code === 0) {
          message.success('添加成功')
          this.form = {
            word: '',
            from: '',
            source: ''
          }
        } else {
          message.error(msg)
        }
      } catch (error) {}
    }
  }
}
</script>

<style>
.ant-layout {
  height: 100vh;
}

.ant-layout-header {
  background-color: #65a4e0;
  font-size: 30px;
  color: #f5f5f5;
  text-align: center;
}
</style>
