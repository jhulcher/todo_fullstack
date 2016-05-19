Rails.application.routes.draw do

  root to: "static_pages#root"

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :destroy, :create]

end
