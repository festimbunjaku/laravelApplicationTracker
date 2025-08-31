<?php

namespace App\Http\Requests;

class StoreJobApplicationRequest extends BaseFormRequest
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
            'link' => 'required|url',
            'title' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'status' => 'nullable|string|in:pending,interview,approved,rejected,in_progress',
            'notes' => 'nullable|string',
        ];
    }
}
