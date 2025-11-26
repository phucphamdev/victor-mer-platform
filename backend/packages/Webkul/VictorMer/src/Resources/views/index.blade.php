<x-admin::layouts>
    <x-slot:title>
        @lang('victor_mer::app.title')
    </x-slot>

    <div class="mb-7 flex items-center justify-between">
        <p class="py-3 text-xl font-bold text-gray-800 dark:text-white">
            @lang('victor_mer::app.title')
        </p>
    </div>

    <div class="grid gap-y-8">
        @foreach (core()->getConfigData('victor_mer') ?? [] as $item)
            @php
                $itemData = core()->getConfigField($item['key']);
            @endphp

            @if($itemData)
                <div>
                    <div class="grid gap-1">
                        <p class="font-semibold text-gray-600 dark:text-gray-300">
                            {{ trans($itemData['name']) }}
                        </p>

                        <p class="text-gray-600 dark:text-gray-300">
                            {{ trans($itemData['info']) }}
                        </p>
                    </div>

                    <div class="box-shadow max-1580:grid-cols-3 mt-2 grid grid-cols-4 flex-wrap justify-between gap-12 rounded bg-white p-4 dark:bg-gray-900 max-xl:grid-cols-2 max-sm:grid-cols-1">
                        @foreach ($itemData['fields'] ?? [] as $field)
                            @if(isset($field['key']))
                                @php
                                    $fieldData = core()->getConfigField($field['key']);
                                @endphp

                                @if($fieldData)
                                    <a
                                        class="flex max-w-[360px] items-center gap-2 rounded-lg p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-950"
                                        href="{{ route('admin.victor_mer.index', [explode('.', $field['key'])[1]]) }}"
                                    >
                                        @if (isset($fieldData['icon']) && $fieldData['icon'])
                                            <img
                                                class="h-[60px] w-[60px] dark:mix-blend-exclusion dark:invert"
                                                src="{{ bagisto_asset('images/' . $fieldData['icon']) }}"
                                            >
                                        @endif

                                        <div class="grid">
                                            <p class="mb-1.5 text-base font-semibold text-gray-800 dark:text-white">
                                                {{ trans($fieldData['name']) }}
                                            </p>

                                            <p class="text-xs text-gray-600 dark:text-gray-300">
                                                {{ trans($fieldData['info']) }}
                                            </p>
                                        </div>
                                    </a>
                                @endif
                            @endif
                        @endforeach
                    </div>
                </div>
            @endif
        @endforeach
    </div>
</x-admin::layouts>
