---
title: 'E-Commerce Platform: 05 Enviroment and Database Initialization'
date: 2023-12-25 14:23:05
tags: [Database, table]
categories: [E-Commerce Platform]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202401022207724.jpg
warning: false
isCarousel: false
---

We need to design tables for our services. There should be user table, products table, sales table, orders table, and wares table.

<!--more-->

The tables’ names **ms** is short for **manage system**.

## ecommerce_users_ms

```sql
-- Drop tables if they exist
DROP TABLE IF EXISTS ums_growth_change_history;
DROP TABLE IF EXISTS ums_integration_change_history;
DROP TABLE IF EXISTS ums_member;
DROP TABLE IF EXISTS ums_member_collect_spu;
DROP TABLE IF EXISTS ums_member_collect_subject;
DROP TABLE IF EXISTS ums_member_level;
DROP TABLE IF EXISTS ums_member_login_log;
DROP TABLE IF EXISTS ums_member_receive_address;
DROP TABLE IF EXISTS ums_member_statistics_info;

/*==============================================================*/
/* Table: ums_growth_change_history                             */
/*==============================================================*/
CREATE TABLE ums_growth_change_history (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    create_time DATETIME COMMENT 'Creation Time',
    change_count INT COMMENT 'Changed value (positive or negative count)',
    note VARCHAR(255) COMMENT 'Note',
    source_type TINYINT COMMENT 'Points source [0 - Shopping, 1 - Admin modification]',
    PRIMARY KEY (id)
);

ALTER TABLE ums_growth_change_history COMMENT 'Growth change history';

/*==============================================================*/
/* Table: ums_integration_change_history                        */
/*==============================================================*/
CREATE TABLE ums_integration_change_history (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    create_time DATETIME COMMENT 'Creation Time',
    change_count INT COMMENT 'Changed value',
    note VARCHAR(255) COMMENT 'Note',
    source_type TINYINT COMMENT 'Source [0->Shopping; 1->Admin modification; 2->Activity]',
    PRIMARY KEY (id)
);

ALTER TABLE ums_integration_change_history COMMENT 'Integration change history';

/*==============================================================*/
/* Table: ums_member                                            */
/*==============================================================*/
CREATE TABLE ums_member (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    level_id BIGINT COMMENT 'Member level ID',
    username CHAR(64) COMMENT 'Username',
    password VARCHAR(64) COMMENT 'Password',
    nickname VARCHAR(64) COMMENT 'Nickname',
    mobile VARCHAR(20) COMMENT 'Mobile number',
    email VARCHAR(64) COMMENT 'Email',
    header VARCHAR(500) COMMENT 'Avatar',
    gender TINYINT COMMENT 'Gender',
    birth DATE COMMENT 'Birthday',
    city VARCHAR(500) COMMENT 'City',
    job VARCHAR(255) COMMENT 'Occupation',
    sign VARCHAR(255) COMMENT 'Personal signature',
    source_type TINYINT COMMENT 'User source',
    integration INT COMMENT 'Integration points',
    growth INT COMMENT 'Growth value',
    status TINYINT COMMENT 'Enable status',
    create_time DATETIME COMMENT 'Registration time',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member COMMENT 'Member';

/*==============================================================*/
/* Table: ums_member_collect_spu                                */
/*==============================================================*/
CREATE TABLE ums_member_collect_spu (
    id BIGINT NOT NULL COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    spu_id BIGINT COMMENT 'SPU ID',
    spu_name VARCHAR(500) COMMENT 'SPU name',
    spu_img VARCHAR(500) COMMENT 'SPU image',
    create_time DATETIME COMMENT 'Creation Time',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member_collect_spu COMMENT 'Member's collected products';

/*==============================================================*/
/* Table: ums_member_collect_subject                            */
/*==============================================================*/
CREATE TABLE ums_member_collect_subject (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    subject_id BIGINT COMMENT 'Subject ID',
    subject_name VARCHAR(255) COMMENT 'Subject name',
    subject_img VARCHAR(500) COMMENT 'Subject image',
    subject_url VARCHAR(500) COMMENT 'Activity URL',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member_collect_subject COMMENT 'Member's collected thematic activities';

/*==============================================================*/
/* Table: ums_member_level                                      */
/*==============================================================*/
CREATE TABLE ums_member_level (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    name VARCHAR(100) COMMENT 'Level name',
    growth_point INT COMMENT 'Growth points needed for the level',
    default_status TINYINT COMMENT 'Default level or not [0->No; 1->Yes]',
    free_freight_point DECIMAL(18,4) COMMENT 'Free shipping standard',
    comment_growth_point INT COMMENT 'Growth points obtained for each review',
    privilege_free_freight TINYINT COMMENT 'Whether there is free shipping privilege',
    privilege_member_price TINYINT COMMENT 'Whether there is member price privilege',
    privilege_birthday TINYINT COMMENT 'Whether there is birthday privilege',
    note VARCHAR(255) COMMENT 'Note',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member_level COMMENT 'Member level';

/*==============================================================*/
/* Table: ums_member_login_log                                  */
/*==============================================================*/
CREATE TABLE ums_member_login_log (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    create_time DATETIME COMMENT 'Creation Time',
    ip VARCHAR(64) COMMENT 'IP',
    city VARCHAR(64) COMMENT 'City',
    login_type
    login_type TINYINT(1) COMMENT 'Login type [1-web, 2-app]',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member_login_log COMMENT 'Member login records';

/*==============================================================*/
/* Table: ums_member_receive_address                            */
/*==============================================================*/
CREATE TABLE ums_member_receive_address (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    name VARCHAR(255) COMMENT 'Recipient name',
    phone VARCHAR(64) COMMENT 'Phone',
    post_code VARCHAR(64) COMMENT 'Postal code',
    province VARCHAR(100) COMMENT 'Province/municipality directly under the Central Government',
    city VARCHAR(100) COMMENT 'City',
    region VARCHAR(100) COMMENT 'District',
    detail_address VARCHAR(255) COMMENT 'Detailed address (street)',
    area_code VARCHAR(15) COMMENT 'Province, city, and district code',
    default_status TINYINT(1) COMMENT 'Whether it is default',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member_receive_address COMMENT 'Member shipping address';

/*==============================================================*/
/* Table: ums_member_statistics_info                            */
/*==============================================================*/
CREATE TABLE ums_member_statistics_info (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    consume_amount DECIMAL(18,4) COMMENT 'Total consumption amount',
    coupon_amount DECIMAL(18,4) COMMENT 'Total discount amount',
    order_count INT COMMENT 'Number of orders',
    coupon_count INT COMMENT 'Number of coupons',
    comment_count INT COMMENT 'Number of reviews',
    return_order_count INT COMMENT 'Number of returns',
    login_count INT COMMENT 'Number of logins',
    attend_count INT COMMENT 'Number of follows',
    fans_count INT COMMENT 'Number of fans',
    collect_product_count INT COMMENT 'Number of collected products',
    collect_subject_count INT COMMENT 'Number of collected thematic activities',
    collect_comment_count INT COMMENT 'Number of collected reviews',
    invite_friend_count INT COMMENT 'Number of invited friends',
    PRIMARY KEY (id)
);

ALTER TABLE ums_member_statistics_info COMMENT 'Member statistics information';

```

## ecommerce_products_ms

```sql
-- Drop tables if they exist
DROP TABLE IF EXISTS pms_attr;
DROP TABLE IF EXISTS pms_attr_attrgroup_relation;
DROP TABLE IF EXISTS pms_attr_group;
DROP TABLE IF EXISTS pms_brand;
DROP TABLE IF EXISTS pms_category;
DROP TABLE IF EXISTS pms_category_brand_relation;
DROP TABLE IF EXISTS pms_comment_replay;
DROP TABLE IF EXISTS pms_product_attr_value;
DROP TABLE IF EXISTS pms_sku_images;
DROP TABLE IF EXISTS pms_sku_info;
DROP TABLE IF EXISTS pms_sku_sale_attr_value;
DROP TABLE IF EXISTS pms_spu_comment;
DROP TABLE IF EXISTS pms_spu_images;
DROP TABLE IF EXISTS pms_spu_info;
DROP TABLE IF EXISTS pms_spu_info_desc;

/*==============================================================*/
/* Table: pms_attr                                              */
/*==============================================================*/
CREATE TABLE pms_attr (
    attr_id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Attribute ID',
    attr_name CHAR(30) COMMENT 'Attribute Name',
    search_type TINYINT COMMENT 'Whether to enable search [0 - No, 1 - Yes]',
    value_type TINYINT(4) DEFAULT NULL COMMENT 'Value type [0 - Single value, 1 - Multiple values]',
    icon VARCHAR(255) DEFAULT NULL COMMENT 'Attribute icon',
    value_select CHAR(255) DEFAULT NULL COMMENT 'Selectable values list [comma-separated]',
    attr_type TINYINT(4) DEFAULT NULL COMMENT 'Attribute type [0 - Sales attribute, 1 - Basic attribute, 2 - Both]',
    enable BIGINT COMMENT 'Enable status [0 - Disabled, 1 - Enabled]',
    catelog_id BIGINT COMMENT 'Belongs to category',
    show_desc TINYINT COMMENT 'Quick display [Whether to display in the introduction; 0 - No, 1 - Yes], can still be adjusted in SKU',
    PRIMARY KEY (attr_id)
);

ALTER TABLE pms_attr COMMENT 'Product attribute';

/*==============================================================*/
/* Table: pms_attr_attrgroup_relation                           */
/*==============================================================*/
CREATE TABLE pms_attr_attrgroup_relation (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    attr_id BIGINT COMMENT 'Attribute ID',
    attr_group_id BIGINT COMMENT 'Attribute group ID',
    attr_sort INT COMMENT 'Sorting within the attribute group',
    PRIMARY KEY (id)
);

ALTER TABLE pms_attr_attrgroup_relation COMMENT 'Attribute & Attribute Group Association';

/*==============================================================*/
/* Table: pms_attr_group                                        */
/*==============================================================*/
CREATE TABLE pms_attr_group (
    attr_group_id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Group ID',
    attr_group_name CHAR(20) COMMENT 'Group Name',
    sort INT COMMENT 'Sorting',
    descript VARCHAR(255) COMMENT 'Description',
    icon VARCHAR(255) COMMENT 'Group icon',
    catelog_id BIGINT COMMENT 'Belongs to category ID',
    PRIMARY KEY (attr_group_id)
);

ALTER TABLE pms_attr_group COMMENT 'Attribute group';

/*==============================================================*/
/* Table: pms_brand                                             */
/*==============================================================*/
CREATE TABLE pms_brand (
    brand_id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Brand ID',
    name CHAR(50) COMMENT 'Brand name',
    logo VARCHAR(2000) COMMENT 'Brand logo address',
    descript LONGTEXT COMMENT 'Introduction',
    show_status TINYINT COMMENT 'Display status [0 - Do not display, 1 - Display]',
    first_letter CHAR(1) COMMENT 'Search first letter',
    sort INT COMMENT 'Sorting',
    PRIMARY KEY (brand_id)
);

ALTER TABLE pms_brand COMMENT 'Brand';

/*==============================================================*/
/* Table: pms_category                                          */
/*==============================================================*/
CREATE TABLE pms_category (
    cat_id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Category ID',
    name CHAR(50) COMMENT 'Category name',
    parent_cid BIGINT COMMENT 'Parent category ID',
    cat_level INT COMMENT 'Hierarchy',
    show_status TINYINT COMMENT 'Whether to display [0 - Do not display, 1 - Display]',
    sort INT COMMENT 'Sorting',
    icon CHAR(255) COMMENT 'Icon address',
    product_unit CHAR(50) COMMENT 'Measurement unit',
    product_count INT COMMENT 'Number of products',
    PRIMARY KEY (cat_id)
);

ALTER TABLE pms_category COMMENT 'Product three-level category';

/*==============================================================*/
/* Table: pms_category_brand_relation                           */
/*==============================================================*/
CREATE TABLE pms_category_brand_relation (
    id BIGINT NOT NULL AUTO_INCREMENT,
    brand_id BIGINT COMMENT 'Brand ID',
    catelog_id BIGINT COMMENT 'Category ID',
    brand_name VARCHAR(255),
    catelog_name VARCHAR(255),
    PRIMARY KEY (id)
);

ALTER TABLE pms_category_brand_relation COMMENT 'Brand category association';

/*==============================================================*/
/* Table: pms_comment_replay                                    */
/*==============================================================*/
CREATE TABLE pms_comment_replay (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    comment_id BIGINT COMMENT 'Comment ID',
    reply_id BIGINT COMMENT 'Reply ID',
    PRIMARY KEY (id)
);

ALTER TABLE pms_comment_replay COMMENT 'Product review reply relationship';

/*==============================================================*/
/* Table: pms_product_attr_value                                */
/*==============================================================*/
CREATE TABLE pms_product_attr_value (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    spu_id BIGINT COMMENT 'Product ID',
    attr_id BIGINT COMMENT 'Attribute ID',
    attr_name VARCHAR(200) COMMENT 'Attribute name',
    attr_value VARCHAR(200) COMMENT 'Attribute value',
    attr_sort INT COMMENT 'Order',
    quick_show TINYINT COMMENT 'Quick display [Whether to display in the introduction; 0 - No, 1 - Yes]',
    PRIMARY KEY (id)
);

ALTER TABLE pms_product_attr_value COMMENT 'SPU attribute value';

/*==============================================================*/
/* Table: pms_sku_images                                        */
/*==============================================================*/
CREATE TABLE pms_sku_images (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    sku_id BIGINT COMMENT 'SKU ID',
    img_url VARCHAR(255) COMMENT 'Image address',
    img_sort INT COMMENT 'Sorting',
    default_img INT COMMENT 'Default image [0 - Not the default image, 1 - Default image]',
    PRIMARY KEY (id)
);

ALTER TABLE pms_sku_images COMMENT 'SKU images';

/*================================================
/* Table: pms_sku_info                                          */
/*==============================================================*/
create table pms_sku_info
(
   sku_id               bigint not null auto_increment comment 'SKU ID',
   spu_id               bigint comment 'SPU ID',
   sku_name             varchar(255) comment 'SKU Name',
   sku_desc             varchar(2000) comment 'SKU Description',
   catalog_id           bigint comment 'Belongs to Category ID',
   brand_id             bigint comment 'Brand ID',
   sku_default_img      varchar(255) comment 'Default Image',
   sku_title            varchar(255) comment 'Title',
   sku_subtitle         varchar(2000) comment 'Subtitle',
   price                decimal(18,4) comment 'Price',
   sale_count           bigint comment 'Sales Count',
   primary key (sku_id)
);

alter table pms_sku_info comment 'SKU Information';

/*==============================================================*/
/* Table: pms_sku_sale_attr_value                               */
/*================================================/* Table: pms_sku_sale_attr_value                               */
/*==============================================================*/
create table pms_sku_sale_attr_value
(
   id                   bigint not null auto_increment comment 'ID',
   sku_id               bigint comment 'SKU ID',
   attr_id              bigint comment 'Attribute ID',
   attr_name            varchar(200) comment 'Sales Attribute Name',
   attr_value           varchar(200) comment 'Sales Attribute Value',
   attr_sort            int comment 'Order',
   primary key (id)
);

alter table pms_sku_sale_attr_value comment 'SKU Sales Attribute & Value';

/*==============================================================*/
/* Table: pms_spu_comment                                       */
/*==============================================================*/
create table pms_spu_comment
(
   id                   bigint not null auto_increment comment 'ID',
   sku_id               bigint comment 'SKU ID',
   spu_id               bigint comment 'SPU ID',
   spu_name             varchar(255) comment 'Product Name',
   member_nick_name     varchar(255) comment 'Member Nickname',
   star                 tinyint(1) comment 'Star Rating',
   member_ip            varchar(64) comment 'Member IP',
   create_time          datetime comment 'Creation Time',
   show_status          tinyint(1) comment 'Display Status [0-Not Displayed, 1-Displayed]',
   spu_attributes       varchar(255) comment 'Attribute Combination when Purchasing',
   likes_count          int comment 'Likes Count',
   reply_count          int comment 'Reply Count',
   resources            varchar(1000) comment 'Comment Images/Videos [JSON Data; [{type: File Type, url: Resource Path}]]',
   content              text comment 'Content',
   member_icon          varchar(255) comment 'User Icon',
   comment_type         tinyint comment 'Comment Type [0 - Direct Comment on Product, 1 - Reply to Comment]',
   primary key (id)
);

alter table pms_spu_comment comment 'Product Review';

/*==============================================================*/
/* Table: pms_spu_images                                        */
/*==============================================================*/
create table pms_spu_images
(
   id                   bigint not null auto_increment comment 'ID',
   spu_id               bigint comment 'SPU ID',
   img_name             varchar(200) comment 'Image Name',
   img_url              varchar(255) comment 'Image URL',
   img_sort             int comment 'Order',
   default_img          tinyint comment 'Is Default Image',
   primary key (id)
);

alter table pms_spu_images comment 'SPU Images';

/*==============================================================*/
/* Table: pms_spu_info                                          */
/*==============================================================*/
create table pms_spu_info
(
   id                   bigint not null auto_increment comment 'Product ID',
   spu_name             varchar(200) comment 'Product Name',
   spu_description      varchar(1000) comment 'Product Description',
   catalog_id           bigint comment 'Belongs to Category ID',
   brand_id             bigint comment 'Brand ID',
   weight               decimal(18,4),
   publish_status       tinyint comment 'Shelf Status [0 - Off Shelf, 1 - On Shelf]',
   create_time          datetime,
   update_time          datetime,
   primary key (id)
);

alter table pms_spu_info comment 'SPU Information';

/*==============================================================*/
/* Table: pms_spu_info_desc                                     */
/*==============================================================*/
create table pms_spu_info_desc
(
   spu_id               bigint not null comment 'Product ID',
   decript              longtext comment 'Product Introduction',
   primary key (spu_id)
);

alter table pms_spu_info_desc comment 'SPU Information Introduction';
```

## ecommerce_sales_ms

```sql
/*==============================================================*/
/* Table: oms_order                                             */
/*==============================================================*/
CREATE TABLE oms_order (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    order_sn CHAR(32) COMMENT 'Order number',
    coupon_id BIGINT COMMENT 'Coupon used',
    create_time DATETIME COMMENT 'Create time',
    member_username VARCHAR(200) COMMENT 'Username',
    total_amount DECIMAL(18,4) COMMENT 'Total order amount',
    pay_amount DECIMAL(18,4) COMMENT 'Amount payable',
    freight_amount DECIMAL(18,4) COMMENT 'Freight amount',
    promotion_amount DECIMAL(18,4) COMMENT 'Promotion optimization amount (Promotion price, full reduction, ladder price)',
    integration_amount DECIMAL(18,4) COMMENT 'Integration deduction amount',
    coupon_amount DECIMAL(18,4) COMMENT 'Coupon deduction amount',
    discount_amount DECIMAL(18,4) COMMENT 'Discount amount for background adjustment order',
    pay_type TINYINT COMMENT 'Payment method [1->Alipay; 2->WeChat; 3->UnionPay; 4->Cash on delivery;]',
    source_type TINYINT COMMENT 'Order source [0->PC order; 1->app order]',
    status TINYINT COMMENT 'Order status [0->To be paid; 1->To be delivered; 2->Delivered; 3->Completed; 4->Closed; 5->Invalid order]',
    delivery_company VARCHAR(64) COMMENT 'Logistics company (delivery method)',
    delivery_sn VARCHAR(64) COMMENT 'Logistics order number',
    auto_confirm_day INT COMMENT 'Automatic confirmation time (days)',
    integration INT COMMENT 'Points that can be obtained',
    growth INT COMMENT 'Growth value that can be obtained',
    bill_type TINYINT COMMENT 'Invoice type [0->No invoice; 1->Electronic invoice; 2->Paper invoice]',
    bill_header VARCHAR(255) COMMENT 'Invoice title',
    bill_content VARCHAR(255) COMMENT 'Invoice content',
    bill_receiver_phone VARCHAR(32) COMMENT 'Invoice receiver phone',
    bill_receiver_email VARCHAR(64) COMMENT 'Invoice receiver email',
    receiver_name VARCHAR(100) COMMENT 'Receiver name',
    receiver_phone VARCHAR(32) COMMENT 'Receiver phone',
    receiver_post_code VARCHAR(32) COMMENT 'Receiver zip code',
    receiver_province VARCHAR(32) COMMENT 'Province/direct municipality',
    receiver_city VARCHAR(32) COMMENT 'City',
    receiver_region VARCHAR(32) COMMENT 'District',
    receiver_detail_address VARCHAR(200) COMMENT 'Detailed address',
    note VARCHAR(500) COMMENT 'Order note',
    confirm_status TINYINT COMMENT 'Confirmation receipt status [0->Not confirmed; 1->Confirmed]',
    delete_status TINYINT COMMENT 'Deletion status [0->Not deleted; 1->Deleted]',
    use_integration INT COMMENT 'Integration used when placing an order',
    payment_time DATETIME COMMENT 'Payment time',
    delivery_time DATETIME COMMENT 'Delivery time',
    receive_time DATETIME COMMENT 'Confirmation receipt time',
    comment_time DATETIME COMMENT 'Evaluation time',
    modify_time DATETIME COMMENT 'Modify time',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order COMMENT 'Order';

/*==============================================================*/
/* Table: oms_order_item                                        */
/*==============================================================*/
CREATE TABLE oms_order_item (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_id BIGINT COMMENT 'Order ID',
    order_sn CHAR(32) COMMENT 'Order SN',
    spu_id BIGINT COMMENT 'Spu ID',
    spu_name VARCHAR(255) COMMENT 'Spu name',
    spu_pic VARCHAR(500) COMMENT 'Spu picture',
    spu_brand VARCHAR(200) COMMENT 'Brand',
    category_id BIGINT COMMENT 'Product category id',
    sku_id BIGINT COMMENT 'Product sku number',
    sku_name VARCHAR(255) COMMENT 'Product sku name',
    sku_pic VARCHAR(500) COMMENT 'Product sku picture',
    sku_price DECIMAL(18,4) COMMENT 'Product sku price',
    sku_quantity INT COMMENT 'Quantity of products purchased',
    sku_attrs_vals VARCHAR(500) COMMENT 'Product sales attribute combination (JSON)',
    promotion_amount DECIMAL(18,4) COMMENT 'Product promotion decomposition amount',
    coupon_amount DECIMAL(18,4) COMMENT 'Coupon discount decomposition amount',
    integration_amount DECIMAL(18,4) COMMENT 'Integration discount decomposition amount',
    real_amount DECIMAL(18,4) COMMENT 'Decomposition amount after the product is discounted',
    gift_integration INT COMMENT 'Gift points',
    gift_growth INT COMMENT 'Gift growth value',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_item COMMENT 'Order item information';

/*==============================================================*/
/* Table: oms_order_operate_history                             */
/*==============================================================*/
CREATE TABLE oms_order_operate_history (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_id BIGINT COMMENT 'Order ID',
    operate_man VARCHAR(100) COMMENT 'Operator [User; System; Background administrator]',
    create_time DATETIME COMMENT 'Operation time',
    order_status TINYINT COMMENT 'Order status [0->To be paid; 1->To be delivered; 2->Delivered; 3->Completed; 4->Closed; 5->Invalid order]',
    note VARCHAR(500) COMMENT 'Remarks',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_operate_history COMMENT 'Order operation history record';

/*==============================================================*/
/* Table: oms_order_return_apply                                */
/*==============================================================*/
CREATE TABLE oms_order_return_apply (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_id BIGINT COMMENT 'Order ID',
    sku_id BIGINT COMMENT 'Return product ID',
    order_sn CHAR(32) COMMENT 'Order number',
    create_time DATETIME COMMENT 'Application time',
    member_username VARCHAR(64) COMMENT 'Member username',
    return_amount DECIMAL(18,4) COMMENT 'Refund amount',
    return_name VARCHAR(100) COMMENT 'Returnee name',
    return_phone VARCHAR(20) COMMENT 'Returnee phone',
    status TINYINT COMMENT 'Application status [0->To be processed; 1->Returning; 2->Completed; 3->Refused]',
    handle_time DATETIME COMMENT 'Processing time',
    sku_img VARCHAR(500) COMMENT 'Product picture',
    sku_name VARCHAR(200) COMMENT 'Product name',
    sku_brand VARCHAR(200) COMMENT 'Product brand',
    sku_attrs_vals VARCHAR(500) COMMENT 'Product sales attribute (JSON)',
    sku_count INT COMMENT 'Return quantity',
    sku_price DECIMAL(18,4) COMMENT 'Product unit price',
    sku_real_price DECIMAL(18,4) COMMENT 'Product actual payment unit price',
    reason VARCHAR(200) COMMENT 'Reason',
    description VARCHAR(500) COMMENT 'Description',
    desc_pics VARCHAR(2000) COMMENT 'Voucher pictures, separated by commas',
    handle_note VARCHAR(500) COMMENT 'Processing remarks',
    handle_man VARCHAR(200) COMMENT 'Processing personnel',
    receive_man VARCHAR(100) COMMENT 'Receiver',
    receive_time DATETIME COMMENT 'Receiving time',
    receive_note VARCHAR(500) COMMENT 'Receiving remarks',
    receive_phone VARCHAR(20) COMMENT '
    Receive phone',
    company_address VARCHAR(500) COMMENT 'Company receiving address',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_return_apply COMMENT 'Order return application';

/*==============================================================*/
/* Table: oms_order_return_reason                               */
/*==============================================================*/
CREATE TABLE oms_order_return_reason (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    name VARCHAR(200) COMMENT 'Return reason name',
    sort INT COMMENT 'Sorting',
    status TINYINT(1) COMMENT 'Enable status',
    create_time DATETIME COMMENT 'Create time',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_return_reason COMMENT 'Return reason';

/*==============================================================*/
/* Table: oms_order_setting                                      */
/*==============================================================*/
CREATE TABLE oms_order_setting (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    flash_order_overtime INT COMMENT 'Seckill order timeout closing time (min)',
    normal_order_overtime INT COMMENT 'Normal order timeout time (min)',
    confirm_overtime INT COMMENT 'Automatic confirmation receipt time after delivery (days)',
    finish_overtime INT COMMENT 'Automatic completion of transaction time, cannot apply for return (days)',
    comment_overtime INT COMMENT 'Automatic evaluation time after order completion (days)',
    member_level TINYINT(2) COMMENT 'Member level [0-Unlimited member level, all universal; Other-Corresponding other member level]',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_setting COMMENT 'Order configuration information';

/*==============================================================*/
/* Table: oms_payment_info                                      */
/*==============================================================*/
CREATE TABLE oms_payment_info (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_sn CHAR(32) COMMENT 'Order number (external business number)',
    order_id BIGINT COMMENT 'Order ID',
    alipay_trade_no VARCHAR(50) COMMENT 'Alipay transaction serial number',
    total_amount DECIMAL(18,4) COMMENT 'Total payment amount',
    subject VARCHAR(200) COMMENT 'Transaction content',
    payment_status VARCHAR(20) COMMENT 'Payment status',
    create_time DATETIME COMMENT 'Create time',
    confirm_time DATETIME COMMENT 'Confirmation time',
    callback_content VARCHAR(4000) COMMENT 'Callback content',
    callback_time DATETIME COMMENT 'Callback time',
    PRIMARY KEY (id)
);

ALTER TABLE oms_payment_info COMMENT 'Payment information table';

/*==============================================================*/
/* Table: oms_refund_info                                       */
/*==============================================================*/
CREATE TABLE oms_refund_info (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_return_id BIGINT COMMENT 'Refund order',
    refund DECIMAL(18,4) COMMENT 'Refund amount',
    refund_sn VARCHAR(64) COMMENT 'Refund transaction serial number',
    refund_status TINYINT(1) COMMENT 'Refund status',
    refund_channel TINYINT COMMENT 'Refund channel [1-Alipay, 2-WeChat, 3-UnionPay, 4-Remittance]',
    refund_content VARCHAR(5000),
    PRIMARY KEY (id)
);

ALTER TABLE oms_refund_info COMMENT 'Refund information';

```

## ecommerce_orders_ms

```mysql
/*==============================================================*/
/* Table: oms_order                                             */
/*==============================================================*/
CREATE TABLE oms_order (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    member_id BIGINT COMMENT 'Member ID',
    order_sn CHAR(32) COMMENT 'Order number',
    coupon_id BIGINT COMMENT 'Coupon used',
    create_time DATETIME COMMENT 'Create time',
    member_username VARCHAR(200) COMMENT 'Username',
    total_amount DECIMAL(18,4) COMMENT 'Total order amount',
    pay_amount DECIMAL(18,4) COMMENT 'Amount payable',
    freight_amount DECIMAL(18,4) COMMENT 'Freight amount',
    promotion_amount DECIMAL(18,4) COMMENT 'Promotion optimization amount (Promotion price, full reduction, ladder price)',
    integration_amount DECIMAL(18,4) COMMENT 'Integration deduction amount',
    coupon_amount DECIMAL(18,4) COMMENT 'Coupon deduction amount',
    discount_amount DECIMAL(18,4) COMMENT 'Discount amount for background adjustment order',
    pay_type TINYINT COMMENT 'Payment method [1->Alipay; 2->WeChat; 3->UnionPay; 4->Cash on delivery;]',
    source_type TINYINT COMMENT 'Order source [0->PC order; 1->app order]',
    status TINYINT COMMENT 'Order status [0->To be paid; 1->To be delivered; 2->Delivered; 3->Completed; 4->Closed; 5->Invalid order]',
    delivery_company VARCHAR(64) COMMENT 'Logistics company (delivery method)',
    delivery_sn VARCHAR(64) COMMENT 'Logistics order number',
    auto_confirm_day INT COMMENT 'Automatic confirmation time (days)',
    integration INT COMMENT 'Points that can be obtained',
    growth INT COMMENT 'Growth value that can be obtained',
    bill_type TINYINT COMMENT 'Invoice type [0->No invoice; 1->Electronic invoice; 2->Paper invoice]',
    bill_header VARCHAR(255) COMMENT 'Invoice title',
    bill_content VARCHAR(255) COMMENT 'Invoice content',
    bill_receiver_phone VARCHAR(32) COMMENT 'Invoice receiver phone',
    bill_receiver_email VARCHAR(64) COMMENT 'Invoice receiver email',
    receiver_name VARCHAR(100) COMMENT 'Receiver name',
    receiver_phone VARCHAR(32) COMMENT 'Receiver phone',
    receiver_post_code VARCHAR(32) COMMENT 'Receiver zip code',
    receiver_province VARCHAR(32) COMMENT 'Province/direct municipality',
    receiver_city VARCHAR(32) COMMENT 'City',
    receiver_region VARCHAR(32) COMMENT 'District',
    receiver_detail_address VARCHAR(200) COMMENT 'Detailed address',
    note VARCHAR(500) COMMENT 'Order note',
    confirm_status TINYINT COMMENT 'Confirmation receipt status [0->Not confirmed; 1->Confirmed]',
    delete_status TINYINT COMMENT 'Deletion status [0->Not deleted; 1->Deleted]',
    use_integration INT COMMENT 'Integration used when placing an order',
    payment_time DATETIME COMMENT 'Payment time',
    delivery_time DATETIME COMMENT 'Delivery time',
    receive_time DATETIME COMMENT 'Confirmation receipt time',
    comment_time DATETIME COMMENT 'Evaluation time',
    modify_time DATETIME COMMENT 'Modify time',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order COMMENT 'Order';

/*==============================================================*/
/* Table: oms_order_item                                        */
/*==============================================================*/
CREATE TABLE oms_order_item (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_id BIGINT COMMENT 'Order ID',
    order_sn CHAR(32) COMMENT 'Order SN',
    spu_id BIGINT COMMENT 'Spu ID',
    spu_name VARCHAR(255) COMMENT 'Spu name',
    spu_pic VARCHAR(500) COMMENT 'Spu picture',
    spu_brand VARCHAR(200) COMMENT 'Brand',
    category_id BIGINT COMMENT 'Product category id',
    sku_id BIGINT COMMENT 'Product sku number',
    sku_name VARCHAR(255) COMMENT 'Product sku name',
    sku_pic VARCHAR(500) COMMENT 'Product sku picture',
    sku_price DECIMAL(18,4) COMMENT 'Product sku price',
    sku_quantity INT COMMENT 'Quantity of products purchased',
    sku_attrs_vals VARCHAR(500) COMMENT 'Product sales attribute combination (JSON)',
    promotion_amount DECIMAL(18,4) COMMENT 'Product promotion decomposition amount',
    coupon_amount DECIMAL(18,4) COMMENT 'Coupon discount decomposition amount',
    integration_amount DECIMAL(18,4) COMMENT 'Integration discount decomposition amount',
    real_amount DECIMAL(18,4) COMMENT 'Decomposition amount after the product is discounted',
    gift_integration INT COMMENT 'Gift points',
    gift_growth INT COMMENT 'Gift growth value',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_item COMMENT 'Order item information';

/*==============================================================*/
/* Table: oms_order_operate_history                             */
/*==============================================================*/
CREATE TABLE oms_order_operate_history (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_id BIGINT COMMENT 'Order ID',
    operate_man VARCHAR(100) COMMENT 'Operator [User; System; Background administrator]',
    create_time DATETIME COMMENT 'Operation time',
    order_status TINYINT COMMENT 'Order status [0->To be paid; 1->To be delivered; 2->Delivered; 3->Completed; 4->Closed; 5->Invalid order]',
    note VARCHAR(500) COMMENT 'Remarks',
    PRIMARY KEY (id)
);

ALTER TABLE oms_order_operate_history COMMENT 'Order operation history record';

/*==============================================================*/
/* Table: oms_order_return_apply                                */
/*==============================================================*/
CREATE TABLE oms_order_return_apply (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
    order_id BIGINT COMMENT 'Order ID',
    sku_id BIGINT COMMENT 'Return product ID',
    order_sn CHAR(32) COMMENT 'Order number',
    create_time DATETIME COMMENT 'Application time',
    member_username VARCHAR(64) COMMENT 'Member username',
    return_amount DECIMAL(18,4) COMMENT 'Refund amount',
    return_name VARCHAR(100) COMMENT 'Returnee name',
    return_phone VARCHAR(20) COMMENT 'Returnee phone',
    status TINYINT COMMENT 'Application status [0->To be processed; 1->Returning; 2->Completed; 3->Refused]',
    handle_time DATETIME COMMENT 'Processing time',
    sku_img VARCHAR(500) COMMENT 'Product picture',
    sku_name VARCHAR(200) COMMENT 'Product name',
    sku_brand VARCHAR(200) COMMENT 'Product brand',
    sku_attrs_vals VARCHAR(500) COMMENT 'Product sales attribute (JSON)',
    sku_count INT COMMENT 'Return quantity',
    sku_price DECIMAL(18,4) COMMENT 'Product unit price',
    sku_real_price DECIMAL(18,4) COMMENT 'Product actual payment unit price',
    reason VARCHAR(200) COMMENT 'Reason',
    description VARCHAR(500) COMMENT 'Description',
    desc_pics VARCHAR(2000) COMMENT 'Voucher pictures, separated by commas',
    handle_note VARCHAR(500) COMMENT 'Processing remarks',
    handle_man VARCHAR(200) COMMENT 'Processing personnel',
    receive_man VARCHAR(100) COMMENT 'Receiver',
    receive_time DATETIME COMMENT 'Receiving time',
   

```

## ecommerce_wares_ms

```sql
DROP TABLE IF EXISTS wms_purchase;

DROP TABLE IF EXISTS wms_purchase_detail;

DROP TABLE IF EXISTS wms_ware_info;

DROP TABLE IF EXISTS wms_ware_order_task;

DROP TABLE IF EXISTS wms_ware_order_task_detail;

DROP TABLE IF EXISTS wms_ware_sku;

/*==============================================================*/
/* Table: wms_purchase                                          */
/*==============================================================*/
CREATE TABLE wms_purchase (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Purchase order id',
    assignee_id BIGINT COMMENT 'Purchaser id',
    assignee_name VARCHAR(255) COMMENT 'Purchaser name',
    phone CHAR(13) COMMENT 'Contact information',
    priority INT(4) COMMENT 'Priority',
    status INT(4) COMMENT 'Status',
    ware_id BIGINT COMMENT 'Warehouse id',
    amount DECIMAL(18,4) COMMENT 'Total amount',
    create_time DATETIME COMMENT 'Creation date',
    update_time DATETIME COMMENT 'Update date',
    PRIMARY KEY (id)
);

ALTER TABLE wms_purchase COMMENT 'Purchase information';

/*==============================================================*/
/* Table: wms_purchase_detail                                   */
/*==============================================================*/
CREATE TABLE wms_purchase_detail (
    id BIGINT NOT NULL AUTO_INCREMENT,
    purchase_id BIGINT COMMENT 'Purchase order id',
    sku_id BIGINT COMMENT 'Purchased item id',
    sku_num INT COMMENT 'Purchase quantity',
    sku_price DECIMAL(18,4) COMMENT 'Purchase amount',
    ware_id BIGINT COMMENT 'Warehouse id',
    status INT COMMENT 'Status [0 New, 1 Allocated, 2 In progress, 3 Completed, 4 Purchase failed]',
    PRIMARY KEY (id)
);

/*==============================================================*/
/* Table: wms_ware_info                                         */
/*==============================================================*/
CREATE TABLE wms_ware_info (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Id',
    name VARCHAR(255) COMMENT 'Warehouse name',
    address VARCHAR(255) COMMENT 'Warehouse address',
    areacode VARCHAR(20) COMMENT 'Area code',
    PRIMARY KEY (id)
);

ALTER TABLE wms_ware_info COMMENT 'Warehouse information';

/*==============================================================*/
/* Table: wms_ware_order_task                                   */
/*==============================================================*/
CREATE TABLE wms_ware_order_task (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Id',
    order_id BIGINT COMMENT 'Order id',
    order_sn VARCHAR(255) COMMENT 'Order sn',
    consignee VARCHAR(100) COMMENT 'Consignee',
    consignee_tel CHAR(15) COMMENT 'Consignee telephone',
    delivery_address VARCHAR(500) COMMENT 'Delivery address',
    order_comment VARCHAR(200) COMMENT 'Order comment',
    payment_way TINYINT(1) COMMENT 'Payment method [1: Online payment 2: Cash on delivery]',
    task_status TINYINT(2) COMMENT 'Task status',
    order_body VARCHAR(255) COMMENT 'Order description',
    tracking_no CHAR(30) COMMENT 'Logistics number',
    create_time DATETIME COMMENT 'Create time',
    ware_id BIGINT COMMENT 'Warehouse id',
    task_comment VARCHAR(500) COMMENT 'Task comment',
    PRIMARY KEY (id)
);

ALTER TABLE wms_ware_order_task COMMENT 'Inventory work order';

/*==============================================================*/
/* Table: wms_ware_order_task_detail                            */
/*==============================================================*/
CREATE TABLE wms_ware_order_task_detail (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Id',
    sku_id BIGINT COMMENT 'Sku_id',
    sku_name VARCHAR(255) COMMENT 'Sku_name',
    sku_num INT COMMENT 'Number of purchases',
    task_id BIGINT COMMENT 'Work order id',
    PRIMARY KEY (id)
);

ALTER TABLE wms_ware_order_task_detail COMMENT 'Inventory work order';

/*==============================================================*/
/* Table: wms_ware_sku                                           */
/*==============================================================*/
CREATE TABLE wms_ware_sku (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Id',
    sku_id BIGINT COMMENT 'Sku_id',
    ware_id BIGINT COMMENT 'Warehouse id',
    stock INT COMMENT 'Inventory count',
    sku_name VARCHAR(200) COMMENT 'Sku_name',
    stock_locked INT COMMENT 'Locked inventory',
    PRIMARY KEY (id)
);

ALTER TABLE wms_ware_sku COMMENT 'Product inventory';

```

