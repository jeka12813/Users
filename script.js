"use strict"
class User {
    constructor() {
        this.twoElement = document.querySelector(".user")
        this.threeElement = document.querySelector(".users")
        this.twoElement.addEventListener("click", this.showUserInformation.bind(this))
        this.fetchUser()

    }
    templateName({email,username,id}) {
        return `
        <div class="card-body" id="${id}" data-role="activ" >
            <p class="card-text">${username}</p>
            <p class="card-title">${email}</p>
        </div>`
    }
    fetchUser() {
        this.fetchUsers('https://jsonplaceholder.typicode.com/users', 'GET', (response) => {
            let data = JSON.parse(response)
            let result = ""
            data.forEach((item) => {
                let tomplate = this.templateName(item)
                result = result + tomplate
            })
            this.twoElement.innerHTML = result
        })

    }
    fetchUsers(url, method, callback) {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = () => {
            if (xhr.status == '200') {
                callback(xhr.response)
            }
        }
        xhr.onerror = () => {
            console.error(xhr.status + ' ' + xhr.statusText)
        }
        xhr.send()
    }

    showUserInformation(event) {
        let {target} = event
        let box = `https://jsonplaceholder.typicode.com/users/${target.id}`
        if (target.dataset.role != "activ") return
        this.fetchUsers(box, 'GET', (response) => {
            let xhr = JSON.parse(response)
            let tomplate = this.templateUser(xhr.name, xhr.email, xhr.address.street, xhr.address.suite, xhr.address.city, xhr.phone, xhr.company.name, xhr.company.catchPhrase)
            let result = ""
            result = tomplate
            this.threeElement.innerHTML = result
        })
    }

    templateUser(name, email, street, suite, city, phone, companyName, catchPhrase) {
        return `
        <div class="card-body ">
          <p class="card-title" >${name}</p>
          <p class="card-text"  >${email}</p>
          <p class="card-text"  >${street}</p>
          <p class="card-text"  >${suite}</p>
          <p class="card-text"  >${city}</p>
          <p class="card-text"  >${phone}</p>
          <p class="card-text"  >${companyName}</p>
          <p class="card-text"  >${catchPhrase}</p>
        </div>`
    }
}
let box = new User()