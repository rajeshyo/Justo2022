import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
  },
 // { path: 'signup', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
/*   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
     
  }, */
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
 
  {
    path: 'gown',
    loadChildren: () => import('./gown/gown.module').then( m => m.GownPageModule),
    canActivate: [AuthGuard]

  },

  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule),
    

  },
 
 
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'order-cancel',
    loadChildren: () => import('./order-cancel/order-cancel.module').then( m => m.OrderCancelPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'newaddress',
    loadChildren: () => import('./newaddress/newaddress.module').then( m => m.NewaddressPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]

  },
  
 
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'payment-confirm',
    loadChildren: () => import('./payment-confirm/payment-confirm.module').then( m => m.PaymentConfirmPageModule),
    canActivate: [AuthGuard]

  },
 
  {
    path: 'continue-shop',
    loadChildren: () => import('./continue-shop/continue-shop.module').then( m => m.ContinueShopPageModule),
    canActivate: [AuthGuard]

  },
 
  {
    path: 'shirtdetail',
    loadChildren: () => import('./shirtdetail/shirtdetail.module').then( m => m.ShirtdetailPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'dealer',
    loadChildren: () => import('./dealer/dealer.module').then( m => m.DealerPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'visit',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'justopolicy',
    loadChildren: () => import('./justopolicy/justopolicy.module').then( m => m.JustopolicyPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'catalouge',
    loadChildren: () => import('./catalouge/catalouge.module').then( m => m.CatalougePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'deals',
    loadChildren: () => import('./deals/deals.module').then( m => m.DealsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'reset-password-mobile',
    loadChildren: () => import('./reset-password-mobile/reset-password-mobile.module').then( m => m.ResetPasswordMobilePageModule)
  },  {
    path: 'outstanding',
    loadChildren: () => import('./outstanding/outstanding.module').then( m => m.OutstandingPageModule)
  },


  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
