FactoryBot.define do
  factory :offer do
    title { Faker::Commerce.product_name }
    description { Faker::Lorem.paragraph }
    gender {['Male', 'Female'].sample}
    ages = [(1..90).to_a.sample, (1..90).to_a.sample]
    min_age {ages.min}
    max_age {ages.max}

  end
end
