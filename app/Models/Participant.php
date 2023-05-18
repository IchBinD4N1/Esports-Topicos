<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    public $timestamps = false;
    use HasFactory;
    protected $fillable = ['league', 'team'];
}
