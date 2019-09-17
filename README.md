# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|varchar(30)|null: false, unique|
|password|varchar(20)|null: false, unique|

## Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false|

### Association
- has_many :group_users
- has_many :users, through: :group_users

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|timestamps|
|image|string|timestamps|

### Association
- belongs_to :user
- belongs_to :group