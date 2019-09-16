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
|user_id|integer|null: false, foreign_key: true, add_index|
|name|string|null: false, foreign_key: true|
|email|varchar(30)|null: false, unique|
|password|varchar(20)|null: false, unique|

## Association
- has_many :groups
- has_many :messages

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, add_index|
|group_id|integer|null: false, foreign_key: true, add_index|
|group_name|string|null: false, unique|

### Association
- has_many :users
- has_many :messages

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, add_index|
|group_id|integer|null: false, foreign_key: true, add_index|
|body|text|null: false, timestamps|
|image|string|timestamps|

### Association
- belongs_to :user
- belongs_to :group