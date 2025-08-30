<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    //    Fillable fields
    protected $fillable = [
        'link',
        'title',
        'position',
        'company',
        'status',
        'notes',
    ];

    //    Belongs to one User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
