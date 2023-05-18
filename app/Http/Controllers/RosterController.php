<?php

namespace App\Http\Controllers;

use App\Models\Roster;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RosterController extends Controller
{

    public function index()
    {
        //
        $rosters = Roster::all();
        return $rosters;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $roster = new Roster();
        $roster->player = $request->player;
        $roster->team = $request->team;

        $roster->save();
    }


    public function show($id)
    {
        //
        $roster = Roster::find($id);
        return $roster;
    }


    public function edit(Roster $roster)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
        $roster = Roster::findOrFail($request->id);
        $roster->player = $request->player;
        $roster->team = $request->team;
        $roster->save();
        return $roster;
    }


    public function destroy($id)
    {
        //
        $roster = Roster::destroy($id);

        return $roster;
    }
}
