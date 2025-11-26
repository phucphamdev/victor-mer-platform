<x-admin::layouts>
    @php
        $currentSlug = request()->route('slug');
        $currentSlug2 = request()->route('slug2');
        $configKey = 'victor_mer.' . $currentSlug;
        
        if ($currentSlug2) {
            $configKey .= '.' . $currentSlug2;
        }
        
        $configData = core()->getConfigField($configKey);
    @endphp

    <x-slot:title>
        {{ trans($configData['name'] ?? 'victor_mer::app.title') }}
    </x-slot>

    <div class="flex items-center justify-between gap-4 max-sm:flex-wrap">
        <p class="text-xl font-bold text-gray-800 dark:text-white">
            {{ trans($configData['name'] ?? 'victor_mer::app.title') }}
        </p>

        <div class="flex items-center gap-x-2.5">
            <a
                href="{{ route('admin.victor_mer.index') }}"
                class="transparent-button hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
            >
                @lang('admin::app.configuration.index.back')
            </a>
        </div>
    </div>

    <x-admin::form
        :action="route('admin.victor_mer.store', [$currentSlug, $currentSlug2])"
        method="POST"
        enctype="multipart/form-data"
    >
        <div class="mt-3.5 flex gap-2.5 max-xl:flex-wrap">
            <div class="flex flex-1 flex-col gap-2 max-xl:flex-auto">
                <div class="box-shadow rounded bg-white p-4 dark:bg-gray-900">
                    <p class="mb-4 text-base font-semibold text-gray-800 dark:text-white">
                        {{ trans($configData['name'] ?? 'victor_mer::app.title') }}
                    </p>

                    @if(isset($configData['fields']))
                        @foreach ($configData['fields'] as $field)
                            @php
                                $name = $field['name'] ?? '';
                                $value = core()->getConfigData($configKey . '.' . $name) ?? ($field['default'] ?? '');
                                $validations = $field['validation'] ?? '';
                            @endphp

                            <x-admin::form.control-group>
                                <x-admin::form.control-group.label :class="str_contains($validations, 'required') ? 'required' : ''">
                                    {{ trans($field['title'] ?? $name) }}
                                </x-admin::form.control-group.label>

                                @if($field['type'] === 'text')
                                    <x-admin::form.control-group.control
                                        type="text"
                                        :name="$configKey . '[' . $name . ']'"
                                        :value="$value"
                                        :rules="$validations"
                                        :label="trans($field['title'] ?? $name)"
                                    />
                                @elseif($field['type'] === 'textarea')
                                    <x-admin::form.control-group.control
                                        type="textarea"
                                        :name="$configKey . '[' . $name . ']'"
                                        :value="$value"
                                        :rules="$validations"
                                        :label="trans($field['title'] ?? $name)"
                                    />
                                @elseif($field['type'] === 'select')
                                    <x-admin::form.control-group.control
                                        type="select"
                                        :name="$configKey . '[' . $name . ']'"
                                        :value="$value"
                                        :rules="$validations"
                                        :label="trans($field['title'] ?? $name)"
                                    >
                                        @foreach($field['options'] ?? [] as $option)
                                            <option value="{{ $option['value'] }}" {{ $value == $option['value'] ? 'selected' : '' }}>
                                                {{ trans($option['title']) }}
                                            </option>
                                        @endforeach
                                    </x-admin::form.control-group.control>
                                @endif

                                <x-admin::form.control-group.error :control-name="$configKey . '[' . $name . ']'" />
                            </x-admin::form.control-group>
                        @endforeach
                    @endif

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        @lang('admin::app.configuration.index.save-btn')
                    </button>
                </div>
            </div>
        </div>
    </x-admin::form>
</x-admin::layouts>
