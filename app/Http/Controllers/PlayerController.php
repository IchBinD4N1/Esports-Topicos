<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlayerController extends Controller
{

    public function index()
    {
        //
        $players = Player::all();
        return $players;
    }

 
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $player = new Player();
        $player->nickname = $request->nickname;
        $player->name = $request->name;
        $player->nationality = $request->nationality;
        $player->age = $request->age;

        $player->save();
    }


    public function show($id)
    {
        //
        $player = Player::find($id);
        return $player;
    }


    public function edit(Player $player)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
        $player = Player::findOrFail($request->id);
        $player->nickname = $request->nickname;
        $player->name = $request->name;
        $player->nationality = $request->nationality;
        $player->age = $request->age;
        $player->save();
        return $player;
    }


    public function destroy($id)
    {
        //
        $player = Player::destroy($id);

        return $player;
    }
}
