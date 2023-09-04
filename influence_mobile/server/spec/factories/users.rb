FactoryBot.define do
  factory :user do
    first_name {Faker::Name.first_name}
    last_name {Faker::Name.last_name}
    user_name {Faker::Name.first_name}
    gender {['Male', 'Female'].sample}
    dob {Faker::Date.birthday}
    special_characters = ['!', '@', '#', '$', '%', '^', '&', '*']
    password {"#{Faker::Lorem.word}#{Faker::Number.number(digits: 2)}#{Faker::Lorem.word}#{special_characters.sample}"}
  end
end
