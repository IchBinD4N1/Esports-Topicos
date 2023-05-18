<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\RosterController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::controller(CountryController::class)->group(function() {
    Route::get('/countries', 'index')->middleware('auth:api');
    Route::post('/country', 'store')->middleware('auth:api');
    Route::get('/country/{id}', 'show')->middleware('auth:api');
    Route::put('/country/{id}', 'update')->middleware('auth:api');
    Route::delete('/country/{id}', 'destroy')->middleware('auth:api');
    
});

Route::controller(TeamController::class)->group(function() {
    Route::get('/teams', 'index')->middleware('auth:api');
    Route::post('/team', 'store')->middleware('auth:api');
    Route::get('/team/{id}', 'show')->middleware('auth:api');
    Route::put('/team/{id}', 'update')->middleware('auth:api');
    Route::delete('/team/{id}', 'destroy')->middleware('auth:api');
});

Route::controller(PlayerController::class)->group(function() {
    Route::get('/players', 'index')->middleware('auth:api');
    Route::post('/player', 'store')->middleware('auth:api');
    Route::get('/player/{id}', 'show')->middleware('auth:api');
    Route::put('/player/{id}', 'update')->middleware('auth:api');
    Route::delete('/player/{id}', 'destroy')->middleware('auth:api');
});

Route::controller(LeagueController::class)->group(function() {
    Route::get('/leagues', 'index')->middleware('auth:api');
    Route::post('/league', 'store')->middleware('auth:api');
    Route::get('/league/{id}', 'show')->middleware('auth:api');
    Route::put('/league/{id}', 'update')->middleware('auth:api');
    Route::delete('/league/{id}', 'destroy')->middleware('auth:api');
    
});

Route::controller(RosterController::class)->group(function() {
    Route::get('/rosters', 'index')->middleware('auth:api');
    Route::post('/roster', 'store')->middleware('auth:api');
    Route::get('/roster/{id}', 'show')->middleware('auth:api');
    Route::put('/roster/{id}', 'update')->middleware('auth:api');
    Route::delete('/roster/{id}', 'destroy')->middleware('auth:api');
    
});

Route::controller(ParticipantController::class)->group(function() {
    Route::get('/participants', 'index')->middleware('auth:api');
    Route::post('/participant', 'store')->middleware('auth:api');
    Route::get('/participant/{id}', 'show')->middleware('auth:api');
    Route::put('/participant/{id}', 'update')->middleware('auth:api');
    Route::delete('/participant/{id}', 'destroy')->middleware('auth:api');
    
});