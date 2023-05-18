<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{

    public function index()
    {
        //
        $participants = Participant::all();
        return $participants;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $participant = new Participant();
        $participant->league = $request->league;
        $participant->team = $request->team;

        $participant->save();
    }


    public function show($id)
    {
        //
        $participant = Participant::find($id);
        return $participant;
    }


    public function edit(Participant $participant)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
        $participant = Participant::findOrFail($request->id);
        $participant->league = $request->league;
        $participant->team  = $request->team ;
        $participant->save();
        return $participant;
    }


    public function destroy($id)
    {
        //
        $participant = Participant::destroy($id);

        return $participant;
    }
}
