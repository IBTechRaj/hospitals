class ContactsMailer < ApplicationMailer
  default :from => 'youremail@gmail.com'
 
  def contact_email(contact)
    @contact = contact
    mail( :to => 'krs30018@gmail.com',
    :subject => 'Personal Contact Info Filled Out' )
  end
end
