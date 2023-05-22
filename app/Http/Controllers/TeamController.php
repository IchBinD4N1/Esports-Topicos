<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TeamController extends Controller
{

    public function index()
    {
        //
        $teams = Team::all();
        return $teams;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $team = new Team();
        $team->name = $request->name;
        $team->location = $request->location;

        $team->save();
    }


    public function show($id)
    {
        //
        $team = Team::find($id);
        return $team;
    }


    public function edit(Team $team)
    {
        //
    }


    public function update(Request $request,  $id)
    {
        //
        $team = Team::findOrFail($request->id);
        $team->name = $request->name;
        $team->location = $request->location;
        $team->save();
        return $team;
    }


    public function destroy($id)
    {
        //
        $team = Team::destroy($id);

        return $team;
    }
}
