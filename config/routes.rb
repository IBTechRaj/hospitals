Rails.application.routes.draw do
  devise_for :users,
             controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
             }
  get '/tester-data', to: 'testers#show'
  root 'contacts#index'
  resources :contacts
end
