Rails.application.routes.draw do

  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :destroy, :create]

  namespace :api, defaults: {format: :json } do
    resources :users, only: [:show]
    resources :items, only: [:new, :create, :destroy, :index]
  end

end
