
// schemas/order.js
export const order = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'customerName',
        title: 'Customer First Name',
        type: 'string',
      },
      {
        name: 'customerLastName',
        title: 'Customer Last Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      {
        name: 'zip',
        title: 'Zip Code',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'orderItems',
        title: 'Order Items',
        type: 'array',
        of: [
          {
            type: 'product',
            name: 'orderItem',
            title: 'Order Item',
            fields: [
              {
                name: 'id',
                title: 'Product ID',
                type: 'string',
              },
              {
                name: 'productName',
                title: 'Product Name',
                type: 'string',
              },
              {
                name: 'price',
                title: 'Price',
                type: 'number',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
              {
                name: 'imageUrl',
                title: 'Image URL',
                type: 'string',
              },
            ],
            preview: {
              select: {
                title: 'productName',
                subtitle: 'quantity',
              },
            },
          },
        ],
      },
      {
        name: 'totalPrice',
        title: 'Total Price',
        type: 'number',
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
      },
    ],
  };
  