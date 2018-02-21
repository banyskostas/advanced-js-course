import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './appComponent'
import { UserComponent } from './userComponent'
import { UserFriendsComponent } from './userFriendsComponent'
import { UsersService } from './usersService'

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        UserFriendsComponent
    ],
    providers: [
        UsersService
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
