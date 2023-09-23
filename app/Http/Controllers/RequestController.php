<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function index()
    {
        $demandes = ModelsRequest::where('status', 0)->get();
        return $demandes;
    }
    public function store(Request $req)
    {
        $demande = new ModelsRequest();
        $demande->title = $req->title;
        $demande->author = $req->author;
        $demande->description = $req->description;
        $demande->save();
        return $demande;
    }
    public function request_done($id)
    {
        $demande = ModelsRequest::find($id);
        $demande->status = 1;
        $demande->save();
    }
}
