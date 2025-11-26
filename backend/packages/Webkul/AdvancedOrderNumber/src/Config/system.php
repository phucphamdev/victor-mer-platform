<?php
use WebbyTroops\AdvancedOrderNumber\Models\SequenceNumber;
return [
    
    /**
     * Sales.
     *
     * Child keys are in different package.
     *
     * Sort `6` | Order Number Advance | Self
     */
    /**
     * Order settings.
     */
    
    [
        'key'  => 'sales',
        'name' => 'admin::app.admin.system.sales',
        'sort' => 5,
    ],
    [
        'key'  => 'sales.advancedOrderNumberSetting',
        'name' => 'advanced-order-number::app.admin.system.advanced-order-numbers',
        'sort' => 6,
    ], 
    [
        'key'    => 'sales.advancedOrderNumberSetting.general',
        'name'   => 'advanced-order-number::app.admin.system.general',
        'sort'   => 0,
        'fields' => [
            [
                'name'          => 'advance-order-number-enable',
                'title'         => 'admin::app.admin.system.enable',
                'type'          => 'boolean',
                'channel_based' => true,
                'locale_based'  => false,
                'info'          => "<b>Note: Enabling this will override default order number settings</b><p class='note'><span>
                            Following pattern should be followed for prefix and suffix of all i.e. Order, Invoice, Shipment and Refund Number.<br><br>
                            Various codes that can be used to create pattern:
                            </span></p><ul style='margin-left: 20px'>
                                <li>{YY}: 4 digits representation of Year</li>
                                <li>{yy}: 2 digits representation of Year</li>
                                <li>{mm}: 2 digits representation of Month</li>
                                <li>{dd}: 2 digits representation of Day of the month</li>
                                <li>{hh}: 12-hour format of an hour in 2 digits</li>
                                <li>{ii}: 2 digits representation of Minutes</li>
                                <li>{ss}: 2 digits representation of Seconds</li>
                                <li>{country}: Country Code of the store</li>
                            </ul>
                            <p><strong>Example:</strong></p>
                            <ol style='margin-left: 20px'>
                                <li>Prefix: PREF-{yy}-{mm}-{dd}-{country}</li>
                                <li>Suffix: {yy}{mm}{dd}{country}SUFF</li>
                            </ol>
                            <p>
                                <strong>Note:</strong><br>
                                </p><ol style='margin-left: 20px'>
                                    <li>Each code must be wrapped in curly braces i.e {}.</li>
                                    <li>Number will be wrapped in between prefix and suffix like {PREFIX}{NUMBER}{SUFFIX}.</li>
                                    <li>While setting Start Counter and Counter Step make sure the complete combination generates the unique number.</li>
                                </ol>
                            <p></p>
                        <p></p>"
            ],
        ],
    ],
    [
        'key'    => 'sales.advancedOrderNumberSetting.orderNumber',
        'name'   => 'advanced-order-number::app.admin.system.order-number',
        'sort'   => 1,
        
        'fields' => [
            [
                'name'          => 'advance_order_number_prefix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-prefix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
                
            ],
            [
                'name'          => 'advance_order_number_suffix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-suffix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_order_number_length',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-length',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_order_number_start_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-start-counter',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_order_number_counter_step',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-counter-step',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_order_number_reset_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-reset-counter',
                'type'          => 'select',
                'options'       => [
                    [
                        'title' => 'Never',
                        'value' => SequenceNumber::NEVER,
                    ], [
                        'title' => 'Every Day',
                        'value' => SequenceNumber::EVERY_DAY,
                    ],
                    [
                        'title' => 'Every Week',
                        'value' => SequenceNumber::EVERY_WEEK,
                    ], 
                    [
                        'title' => 'Every Month',
                        'value' => SequenceNumber::EVERY_MONTH,
                    ],
                    [
                        'title' => 'Every Year',
                        'value' => SequenceNumber::EVERY_YEAR,
                    ]
                ],
                'info'  => '<a target="_blank" class="btn btn-lg btn-primary reset-button" href="'.config("app.url").'wt/reset-counter?entity=order">Reset Now</a>'
            ],
        ],
    ],
    [
        'key'    => 'sales.advancedOrderNumberSetting.invoiceNumber',
        'name'   => 'advanced-order-number::app.admin.system.invoice-number',
        'sort'   => 2,
        'fields' => [
            [
                'name'          => 'advance_invoice_number_prefix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-prefix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
                
            ],
            [
                'name'          => 'advance_invoice_number_suffix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-suffix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_invoice_number_length',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-length',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_invoice_number_start_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-start-counter',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_invoice_number_counter_step',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-counter-step',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_invoice_number_reset_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-reset-counter',
                'type'          => 'select',
                'options'       => [
                    [
                        'title' => 'Never',
                        'value' => SequenceNumber::NEVER,
                    ], [
                        'title' => 'Every Day',
                        'value' => SequenceNumber::EVERY_DAY,
                    ],
                    [
                        'title' => 'Every Week',
                        'value' => SequenceNumber::EVERY_WEEK,
                    ], 
                    [
                        'title' => 'Every Month',
                        'value' => SequenceNumber::EVERY_MONTH,
                    ],
                    [
                        'title' => 'Every Year',
                        'value' => SequenceNumber::EVERY_YEAR,
                    ]
                ],
                'info'  => '<a target="_blank" class="btn btn-lg btn-primary reset-button" href="'.config("app.url").'wt/reset-counter?entity=invoice">Reset Now</a>'
            ],
        ],
    ],
    [
        'key'    => 'sales.advancedOrderNumberSetting.shipmentNumber',
        'name'   => 'advanced-order-number::app.admin.system.shipment-number',
        'sort'   => 3,
        'fields' => [
            [
                'name'          => 'advance_shipment_number_prefix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-prefix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
                
            ],
            [
                'name'          => 'advance_shipment_number_suffix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-suffix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_shipment_number_length',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-length',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_shipment_number_start_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-start-counter',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_shipment_number_counter_step',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-counter-step',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_shipment_number_reset_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-reset-counter',
                'type'          => 'select',
                'options'       => [
                    [
                        'title' => 'Never',
                        'value' => SequenceNumber::NEVER,
                    ], [
                        'title' => 'Every Day',
                        'value' => SequenceNumber::EVERY_DAY,
                    ],
                    [
                        'title' => 'Every Week',
                        'value' => SequenceNumber::EVERY_WEEK,
                    ], 
                    [
                        'title' => 'Every Month',
                        'value' => SequenceNumber::EVERY_MONTH,
                    ],
                    [
                        'title' => 'Every Year',
                        'value' => SequenceNumber::EVERY_YEAR,
                    ]
                ],
                'info'  => '<a target="_blank" class="btn btn-lg btn-primary reset-button" href="'.config("app.url").'wt/reset-counter?entity=shipment">Reset Now</a>'
            ],
        ],
    ],
    [
        'key'    => 'sales.advancedOrderNumberSetting.refundNumber',
        'name'   => 'advanced-order-number::app.admin.system.refund-number',
        'sort'   => 4,
        'fields' => [
            [
                'name'          => 'advance_refund_number_prefix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-prefix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
                
            ],
            [
                'name'          => 'advance_refund_number_suffix',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-suffix',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_refund_number_length',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-length',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_refund_number_start_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-number-start-counter',
                'type'          => 'text',
                'validation'    => false,
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_refund_number_counter_step',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-counter-step',
                'type'          => 'text',
                'validation'    => 'numeric',
                'channel_based' => true,
                'locale_based'  => true,
            ],
            [
                'name'          => 'advance_refund_number_reset_counter',
                'title'         => 'advanced-order-number::app.admin.system.advance-order-reset-counter',
                'type'          => 'select',
                'options'       => [
                    [
                        'title' => 'Never',
                        'value' => SequenceNumber::NEVER,
                    ], [
                        'title' => 'Every Day',
                        'value' => SequenceNumber::EVERY_DAY,
                    ],
                    [
                        'title' => 'Every Week',
                        'value' => SequenceNumber::EVERY_WEEK,
                    ], 
                    [
                        'title' => 'Every Month',
                        'value' => SequenceNumber::EVERY_MONTH,
                    ],
                    [
                        'title' => 'Every Year',
                        'value' => SequenceNumber::EVERY_YEAR,
                    ]
                ],
                'info'  => '<a target="_blank" class="btn btn-lg btn-primary reset-button" href="'.config("app.url").'wt/reset-counter?entity=refund">Reset Now</a>'
            ],
        ],
    ]

];
