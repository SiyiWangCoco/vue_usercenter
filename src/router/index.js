import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//  未登录
import unloginPage from '@/views/Unlogin.vue' //  未登录路由
import loginPage from '@/views/Login.vue' //  登录
import registerPage from '@/views/Register.vue' //  注册
import appealPage from '@/views/Appeal.vue' //  申诉
import findPage from '@/views/FindPassword.vue' //  忘记密码
import forgetPage from '@/views/forget.vue' //  找回密码父路由
import findPasswordByEmailPage from '@/views/FindPasswordByEmail.vue' //  通过邮箱找回密码
import findPasswordByPhonePage from '@/views/FindPasswordByPhone.vue' //  通过邮箱找回密码
import findPasswordByQuestionPage from '@/views/FindPasswordByQuestion.vue' //  通过密保找回密码
//  已登录
import loggedPage from '@/views/Logged.vue' //  已登录父路由
import userPage from '@/views/UserInfo.vue' //  用户
import infoPage from '@/views/UserInfoChange.vue' //  用户个人信息修改
import passwordPage from '@/views/EditPassword.vue' //  重设密码
import identityPage from '@/views/Identity.vue' //  实名认证
import phonePage from '@/views/UserPhone.vue' //   用户手机号码
import emailPage from '@/views/UserEmail.vue' //   用户邮箱
import questionPage from '@/views/SecurityQuestion.vue' //  用户密保
import thirdPartyPage from '@/views/ThirdParty.vue' //  用户第三方绑定
import creditPage from '@/views/Credit.vue' //  充值信息父路由
import creditRecordPage from '@/views/CreditRecord.vue' //  用户充值记录
import chargeGamePage from '@/views/CreditCharge.vue' //  用户游戏充值（游戏选择）
import chargeRegionPage from '@/views/CreditChooseRegion.vue' //  用户游戏充值（区服选择）
import chargeRulePage from '@/views/CreditRule.vue' //  用户游戏充值（礼包选择）
import payPage from '@/views/CreditChargeConfirm.vue' //  确认充值

Vue.use(Router)

export default new Router({
  routes: [
    //  默认：未登录
    {
      path: '/',
      name: 'unlogin',
      component: unloginPage,
      redirect: '/login',
      children: [{
        path: 'login',
        name: 'login',
        component: loginPage
      },
      {
        path: 'register',
        name: 'register',
        component: registerPage
      },
      {
        path: 'appeal',
        name: 'appeal',
        component: appealPage
      },
      {
        path: 'find',
        name: 'find',
        component: findPage
      },
      {
        path: 'forget',
        name: 'forget',
        component: forgetPage,
        children: [{
          path: 'email',
          name: 'PasswordEmail',
          component: findPasswordByEmailPage
        },
        {
          path: 'phone',
          name: 'PasswordPhone',
          component: findPasswordByPhonePage
        },
        {
          path: 'question',
          name: 'PasswordQuestion',
          component: findPasswordByQuestionPage
        }
        ]
      }
      ]
    },
    //  已登录
    {
      path: '/user',
      name: 'user',
      component: loggedPage,
      redirect: '/user/info',
      children: [{
        path: 'password',
        name: 'password',
        component: passwordPage
      },
      {
        path: 'identity',
        name: 'identity',
        component: identityPage
      },
      {
        path: 'phone',
        name: 'phone',
        component: phonePage
      },
      {
        path: 'email',
        name: 'email',
        component: emailPage
      },
      {
        path: 'question',
        name: 'question',
        component: questionPage
      },
      {
        path: 'third-party',
        name: 'thirdParty',
        component: thirdPartyPage
      },
      {
        path: 'info',
        name: 'info',
        component: userPage
      },
      {
        path: 'edit',
        name: 'edit',
        component: infoPage
      },
      {
        path: 'credit',
        name: 'credit',
        component: creditPage,
        children: [{
          path: 'record',
          name: 'record',
          component: creditRecordPage
        },
        {
          path: 'change-game',
          name: 'game',
          component: chargeGamePage
        },
        {
          path: 'change-region',
          name: 'region',
          component: chargeRegionPage
        },
        {
          path: 'change-rule',
          name: 'rule',
          component: chargeRulePage
        },
        {
          path: 'pay',
          name: 'pay',
          component: payPage
        }
        ]
      }
      ]
    }
  ]
})
