<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\MeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Dashboard\LogoutController;

Route::group(['middleware' => 'api', 'prefix' => ''], function () {
    Route::get('/', HomeController::class);

    //Authentication, Register, Login, Logout 
    Route::post('/register', RegisterController::class);
    Route::post('/login', LoginController::class);

    //Authenticated user, UserData, Profile, Password Etc.

    Route::get('/me', MeController::class);
    Route::get('/logout', LogoutController::class);
});