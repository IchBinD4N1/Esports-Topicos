<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LeagueController extends Controller
{
   
    public function index()
    {
        //
        $leagues = League::all();
        return $leagues;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $league = new League();
        $league->name = $request->name;
        $league->location = $request->location;

        $league->save();
    }


    public function show($id)
    {
        //
        $league = League::find($id);
        return $league;
    }


    public function edit(League $league)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        //
        $league = League::findOrFail($request->id);
        $league->name = $request->name;
        $league->location  = $request->location ;
        $league->save();
        return $league;
    }


    public function destroy($id)
    {
        //
        $league = League::destroy($id);

        return $league;
    }
}
