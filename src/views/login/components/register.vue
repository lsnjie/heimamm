<template>
  <el-dialog class="rei_dialog" title="用户名称" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="5">
            <!-- :offset='2' 列偏移 -->
            <img @click="changeImg" class="codeimg" :src="imgUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="7">
            <el-button :disabled='time!==0' @click="getcode" class="reg_btn">{{time === 0? '获取用户验证码':time}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 得到手机验证码的方法
import { apiGetcode } from "../../../api/register";
// 定义校验方法
var checkphone = function(rule, value, callback) {
  // 定义一个手机的正则
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 验证参数的合法性
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机不正确"));
  }
};
var checkemaill = function(rule, value, callback) {
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱不合法"));
  }
};
export default {
  data() {
    return {
      // 控制对话框的打开和隐藏
      dialogFormVisible: false,
      //   说明文本的宽度
      formLabelWidth: "67px",
      //   from 的数据
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        logincode: ""
      },
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { validator: checkemaill, trigger: "blur" },
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: checkphone, trigger: "blur" }
        ],
        password: [
          //   非空
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在是4个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度在是6个字符", trigger: "blur" }
        ]
      },
      // 定义一个验证码图片的链接
      imgUrl:
        process.env.VUE_APP_ONLINEURL + "/captcha?type=sendsms&t=" + Date.now(),
      // 定义一个定时器
      timer: null,
      // 禁用时间
      time: 0
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({ message: "验证通过", type: "success" });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
    // 点击切换验证码
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_ONLINEURL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 点击获取验证码按钮得到验证码
    getcode() {
      // 添加一个定时器: 判断当前按钮是否可以点击
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        // 当时间为0 是 定时器清空
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      apiGetcode({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
      });
    }
  }
};
</script>

<style lang='less'>
.rei_dialog {
  .el-dialog__header {
    text-align: center;
    padding: 0;
    height: 53px;
    line-height: 53px;
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    .el-dialog__title {
      color: #fff;
    }
  }
  .imgbox {
    height: 41px;
    text-align: right;
    .codeimg {
      width: 143px;
      height: 41px;
    }
  }
  .reg_btn {
    width: 143px;
    height: 41px;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>