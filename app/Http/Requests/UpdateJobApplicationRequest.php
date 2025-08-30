<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'link' => 'sometimes|url',
            'title' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'company' => 'sometimes|string|max:255',
            'status' => 'nullable|string|in:pending,interview, approved, rejected',
            'notes' => 'nullable|string',
        ];
    }
}
