class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presense: true, unless: :image?
end
