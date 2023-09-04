Rails.application.routes.draw do
  resources :offers
  resources :users
  post '/auth/login', to: 'authentication#login'
  get '/user', to: 'users#profile'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
