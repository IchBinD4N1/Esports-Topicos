<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CountryController extends Controller
{

    public function index()
    {
        //
        $countries = Country::all();
        return $countries;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $country = new Country();
        $country->name = $request->name;
        $country->demonym = $request->demonym;

        $country->save();
    }


    public function show($id)
    {
        //
        $country = Country::find($id);
        return $country;
    }


    public function edit(Country $country)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        //
        $country = Country::findOrFail($request->id);
        $country->name = $request->name;
        $country->demonym  = $request->demonym ;
        $country->save();
        return $country;
    }


    public function destroy($id)
    {
        //
        $country = Country::destroy($id);

        return $country;
    }
}
