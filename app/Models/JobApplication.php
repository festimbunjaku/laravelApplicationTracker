<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    use HasFactory;

    //    Fillable fields
    protected $fillable = [
        'user_id',
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
