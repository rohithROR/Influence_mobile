class User < ApplicationRecord
	has_secure_password
	validates :first_name, presence: true
	validates :last_name, presence: true
	validates :gender, presence: true
	validates :dob, presence: true
	validates :password_digest, presence: true
	validates :user_name, uniqueness: true, presence: true

	def age
		now = Time.now.utc.to_date
	    now.year - dob.year
	end
end
