"use strict";
const rowsPerPage = 10
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal
let provider;
let selectedAccount;

function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "8d03fea006b64542ab9c26af741965b2",
            }
        },
    };

    web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
    });
}

async function fetchAccountData() {
    $('.disconnected-container').hide()
    $('.connected-container').show()
    const web3 = new Web3(provider);
    const chainId = await web3.eth.getChainId();
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];
    $('.wallet-address').html(getEllipsedAddress(selectedAccount));
    var providerInfo = web3Modal.providerController.getProvider(web3Modal.cachedProvider)
    if (providerInfo && providerInfo.logo) {
        $('.provider-logo').attr('src', providerInfo.logo);
    }
    else {
        $('.provider-logo').attr('src', "");
    }
    clearRewardData();
    $.get('https://wa40rbimfl.execute-api.us-east-1.amazonaws.com/prod/reward/' + selectedAccount, null, function (response) {    
        if (response) {
            $('.total-accumulated-rewards > span').html(convertValueToDecimals(response.totalReward) + " AUC");
            $('.total-paid-rewards > span').html(convertValueToDecimals(response.totalPaid) + " AUC");
            $('.total-pending-rewards > span').html(convertValueToDecimals(subtract(response.totalReward, response.totalPaid)) + " AUC");
            for (let i = 0; i < response.pools.length; i++) {
                const reward = response.pools[i];
                var className = getPoolClassNameFromAddress(reward.contract);
                var poolHtml = $('.' + className)
                poolHtml.find('.current-pool-share > span').html(convertValueToPercentage(reward.poolShare))
                poolHtml.find('.current-estimated-rewards > span').html(convertValueToDecimals(reward.weeklyProjection) + " AUC / week")
                poolHtml.find('.accumulated-rewards > span').html(convertValueToDecimals(reward.aucAmount) + " AUC")
            }

            userRewards = response.rewards
            userPayments = response.payments
            setUserCurrentPagePayments()
            setUserCurrentPageRewards()
        }
    })
}

var userPayments = []
function setUserCurrentPagePayments() {
    var paymentRowTemplate = "<tr><td><a href='https://etherscan.io/tx/{transactionHash}' target='_blank'>{transactionHashTruncated}</a></td><td>{value}</td></tr>"
    var paymentsTab = $('#payments')
    var tableBody = paymentsTab.children('table').children('tbody')
    tableBody.html('')
    $('.payments-pagination').pagination({
        dataSource: userPayments,
        callback: function (data, pagination) {
            var tableBody = paymentsTab.children('table').children('tbody')
            tableBody.html('')
            for (let i = 0; i < data.length; i++) {
                var payment = data[i]
                var row = paymentRowTemplate
                    .replace("{transactionHash}", payment.transactionHash)
                    .replace("{transactionHashTruncated}", getEllipsedAddress(payment.transactionHash))
                    .replace("{value}", convertValueToDecimals(payment.value) + " AUC")
                tableBody.append(row)
            }
        }
    })
    if (userPayments.length === 0) {
        tableBody.append("<tr><td colspan='2'>No payments received yet.</td></tr>")
    }
}

var userRewards = []
function setUserCurrentPageRewards() {
    var rewardRowTemplate = "<tr><td>{date} - #{blockNumber}</td><td>{contract}</td><td>{share}</td><td>{amount}</td></tr>"
    var rewardsTab = $('#rewards')
    var tableBody = rewardsTab.children('table').children('tbody')
    tableBody.html('')
    $('.rewards-pagination').pagination({
        dataSource: userRewards,
        callback: function (data, pagination) {
            var tableBody = rewardsTab.children('table').children('tbody')
            tableBody.html('')
            for (let i = 0; i < data.length; i++) {
                var reward = data[i]
                var row = rewardRowTemplate
                    .replace("{date}", formatDate(reward.t))
                    .replace("{blockNumber}", reward.b)
                    .replace("{contract}", getPoolNameFromContract(reward.c))
                    .replace("{share}", convertValueToPercentage(reward.s))
                    .replace("{amount}", convertValueToDecimals(reward.a) + " AUC")
                tableBody.append(row)
            }
        }
    })    
    if (userRewards.length === 0) {
        tableBody.append("<tr><td colspan='4'>No rewards computed yet.</td></tr>");
    }
}

function filterList(list, currentPage) {
    return list.slice((currentPage - 1) * rowsPerPage, rowsPerPage)
}

function getEllipsedAddress(address) {
    return address.substring(0, 6) + "..." + address.substring(address.length - 5, address.length)
}

function clearRewardData() {
    $('.total-accumulated-rewards > span').html('-');
    $('.total-paid-rewards > span').html('-');
    $('.total-pending-rewards > span').html('-');
    ['usdc-pool', 'eth-pool'].forEach(className => {
        var poolHtml = $('.' + className)
        poolHtml.find('.current-pool-share > span').html('-')
        poolHtml.find('.current-estimated-rewards > span').html('-')
        poolHtml.find('.accumulated-rewards > span').html('-')
    });
    userRewards = []
    userPayments = []
    setUserCurrentPagePayments()
    setUserCurrentPageRewards()
}

function convertValueToPercentage(value) {
    return Number(value).toLocaleString(undefined, { style: 'percent', maximumFractionDigits: 6, maximumSignificantDigits: 4 })
}

function formatDate(time) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' }
    return new Date(time).toLocaleString("en-US", options)
}

function getPoolClassNameFromAddress(address) {
    var addressUpercase = address.toUpperCase()
    if (addressUpercase === "0XF64F38AE6B1E6144F292ECFA0A7C9236885F032E") {
        return "usdc-pool"
    }
    else if (addressUpercase === "0X7FC95945EAA14E7A2954052A4C9BFBAA79D170AE") {
        return "eth-pool"
    }
}

function getPoolNameFromContract(address) {
    var addressUpercase = address.toUpperCase()
    if (addressUpercase === "0XF64F38AE6B1E6144F292ECFA0A7C9236885F032E") {
        return "AUC + USDC"
    }
    else if (addressUpercase === "0X7FC95945EAA14E7A2954052A4C9BFBAA79D170AE") {
        return "AUC + ETH"
    }
    return "-"
}

function subtract(value1, value2) {
    const web3 = new Web3(provider);
    return web3.utils.toBN(value1).sub(web3.utils.toBN(value2)).toString()
}

function convertValueToDecimals(value) {
    const web3 = new Web3(provider);
    var value = web3.utils.fromWei(value, "ether");
    var number = new Number(value)
    if (number >= 1) {
        return number.toLocaleString(undefined, {maximumFractionDigits: 2})
    }
    else {
        return number.toLocaleString(undefined, { maximumSignificantDigits: 3 })
    }    
}

async function refreshAccountData() {
    await fetchAccountData();
}

async function onConnect() {
    try {
        provider = await web3Modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
    });

    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
    });

    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });

    await refreshAccountData();
}

async function onDisconnect() {
    if (provider.close) {
        await provider.close();
    }
    await web3Modal.clearCachedProvider();
    provider = null;

    selectedAccount = null;
    setDisconnectedLayout();
}

function setDisconnectedLayout() {
    $('.disconnected-container').show()
    $('.connected-container').hide()
}

window.addEventListener('load', async () => {
    if (window.location && window.location.hash === "#track") {
        $('#track-tab').tab('show')
    }

    init();
    $(".btn-connect").click(onConnect);
    $(".btn-disconnect").click(onDisconnect);

    if (web3Modal.cachedProvider) {
        onConnect()
    }
    else {
        setDisconnectedLayout()
    }
});